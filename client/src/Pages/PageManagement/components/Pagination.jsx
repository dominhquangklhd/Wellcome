import './Pagination.css';

export default function Pagination({ totalProducts, currentPage, setCurrentPage }) {
    const itemsPerPage = 5;
    const totalPages = Math.ceil(totalProducts / itemsPerPage);
    return (
        <div className="pagination-container">
            {Array.from({ length: totalPages }, (_, i) => (
                <button
                    key={i}
                    onClick={() => setCurrentPage(i + 1)}
                    className={`pagination-button ${currentPage === i + 1 ? 'active' : ''}`}
                >
                    {i + 1}
                </button>
            ))}
        </div>
    );
}