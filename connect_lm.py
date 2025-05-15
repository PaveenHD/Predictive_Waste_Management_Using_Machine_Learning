import os
from langchain_groq import ChatGroq  # Import Groq LLM
from langchain_core.prompts import PromptTemplate
from langchain.chains import RetrievalQA
from langchain_community.embeddings import SentenceTransformerEmbeddings
from langchain_community.vectorstores import FAISS

# Step 1: Setup Groq LLM
DB_FAISS_PATH = "vectorstore/db_faiss"
GROQ_MODEL = "llama3-8b-8192"  # Groq model name
GROQ_API_KEY = os.getenv("GROQ_API_KEY")  # Load API key from env variable

if not GROQ_API_KEY:
    raise ValueError("Groq API Key is missing! Set it as an environment variable.")

def load_llm():
    return ChatGroq(model_name=GROQ_MODEL, groq_api_key=GROQ_API_KEY)

# Step 2: Define Custom Prompt
CUSTOM_PROMPT_TEMPLATE = """
Use the provided context to answer the question. 
If you don't know the answer, just say you don't know—don't make up an answer. 
Provide only relevant information from the context.

Context: {context}
Question: {question}

Respond concisely.
"""

def set_custom_prompt():
    return PromptTemplate(template=CUSTOM_PROMPT_TEMPLATE, input_variables=["context", "question"])

# Step 3: Load FAISS Vector Store
embedding_model = SentenceTransformerEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2") 
db = FAISS.load_local(DB_FAISS_PATH, embedding_model, allow_dangerous_deserialization=True)

# Step 4: Create RetrievalQA Chain
qa_chain = RetrievalQA.from_chain_type(
    llm=load_llm(),
    chain_type="stuff",
    retriever=db.as_retriever(search_kwargs={'k': 3}),
    return_source_documents=True,
    chain_type_kwargs={'prompt': set_custom_prompt()}
)

# Step 5: Query the Chatbot
user_query = input("Write Query Here: ")
response = qa_chain.invoke({'query': user_query})

# Output Results
print("\n🔹 RESULT:\n", response["result"])
print("\n📚 SOURCE DOCUMENTS:\n", response["source_documents"])
