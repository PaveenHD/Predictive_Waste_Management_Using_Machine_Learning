from langchain_community.document_loaders import PDFPlumberLoader, DirectoryLoader
from langchain.text_splitter import RecursiveCharacterTextSplitter
from langchain_community.vectorstores import FAISS
from langchain_community.embeddings import HuggingFaceEmbeddings
import os

# Step 1: Load PDF Files Safely
DATA_PATH = "data"

def load_pdf_files(data_path, max_pages=5):
    documents = []
    loader = DirectoryLoader(data_path, glob="*.pdf", loader_cls=PDFPlumberLoader)
    
    try:
        docs = loader.load()
        for doc in docs:
            if len(doc.page_content.split()) > max_pages * 300:  # Approximate word limit
                doc.page_content = " ".join(doc.page_content.split()[:max_pages * 300])  # Trim content
            documents.append(doc)
    except Exception as e:
        print(f"Error loading PDFs: {e}")
    
    return documents

documents = load_pdf_files(DATA_PATH)

# Step 2: Create Chunks
def create_chunks(extracted_data):
    text_splitter = RecursiveCharacterTextSplitter(chunk_size=300, chunk_overlap=50)
    return text_splitter.split_documents(extracted_data)

text_chunks = create_chunks(documents)

# Step 3: Use an Alternative Embedding Model
def get_embedding_model():
    return HuggingFaceEmbeddings(model_name="sentence-transformers/all-MiniLM-L6-v2")

embedding_model = get_embedding_model()

# Step 4: Store embeddings in FAISS
DB_FAISS_PATH = "vectorstore/db_faiss"
db = FAISS.from_documents(text_chunks, embedding_model)
db.save_local(DB_FAISS_PATH)

print("FAISS vector store created successfully!")
