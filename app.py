from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from langchain.chains import RetrievalQA
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Initialize FastAPI app
app = FastAPI()

# Enable CORS for frontend access
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Request and response models
class QueryRequest(BaseModel):
    query: str

class QueryResponse(BaseModel):
    result: str
    sources: list[str]

# Langchain + Groq + FAISS setup
from langchain_groq import ChatGroq
from langchain_core.prompts import PromptTemplate
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS

# Config
DB_FAISS_PATH = "vectorstore/db_faiss"
GROQ_MODEL = "llama3-8b-8192"
GROQ_API_KEY = os.getenv("GROQ_API_KEY")

if not GROQ_API_KEY:
    raise ValueError("Groq API Key is missing! Set it in .env")

# Load Groq LLM (ChatGPT-like)
def load_llm():
    return ChatGroq(model_name=GROQ_MODEL, groq_api_key=GROQ_API_KEY)

# Prompt that mimics ChatGPT behavior but uses context if available
CUSTOM_PROMPT_TEMPLATE = """
Answer the question conversationally like ChatGPT. Use the context below if it’s helpful.

Context:
{context}

Question: {question}

Answer in a helpful, detailed, and human tone.
"""

def set_custom_prompt():
    return PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE, input_variables=["context", "question"])

# Load vector store
def load_faiss_vector_store(path, embedding_model):
    return FAISS.load_local(path, embedding_model, allow_dangerous_deserialization=True)

embedding_model = SentenceTransformerEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")
vector_store = load_faiss_vector_store(DB_FAISS_PATH, embedding_model)

# Create QA chain using vector context
def create_qa_chain(llm, retriever, prompt):
    return RetrievalQA.from_chain_type(
        llm=llm,
        chain_type="stuff",
        retriever=retriever,
        return_source_documents=True,
        chain_type_kwargs={"prompt": prompt}
    )

qa_chain = create_qa_chain(
    llm=load_llm(),
    retriever=vector_store.as_retriever(search_kwargs={"k": 3}),
    prompt=set_custom_prompt()
)

# Endpoint: Query like ChatGPT + RAG
@app.post("/query", response_model=QueryResponse)
async def query_endpoint(request: QueryRequest):
    try:
        # Run through RAG chain
        response = qa_chain({"query": request.query})
        result = response.get("result", "").strip()
        sources = [doc.page_content for doc in response.get("source_documents", [])]

        # Fallback to pure ChatGPT-style answer if nothing retrieved
        if not sources or result.lower() in ["i don't know", "i am not sure", ""]:
            llm = load_llm()
            result = llm.invoke(request.query)
            sources = ["(Generated from general knowledge, no context used)"]

        return QueryResponse(result=result, sources=sources)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error: {str(e)}")

# Run with: uvicorn app:app --reload
if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)