// Data structure example (akan diisi dari database)
let purchaseHistory = [];

// Utility Functions
const formatDate = (date) => {
    return new Date(date).toLocaleDateString('id-ID', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
};

const formatCurrency = (amount) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR'
    }).format(amount);
};

class PurchaseHistoryViewer {
    constructor() {
        this.tableBody = document.querySelector('.history-table tbody');
        this.loadingIndicator = document.querySelector('.loading-indicator');
        this.initialize();
    }

    initialize() {
        this.loadData();
        // Optional: Add refresh button functionality
        const refreshButton = document.querySelector('#refreshHistory');
        if (refreshButton) {
            refreshButton.addEventListener('click', () => this.loadData());
        }
    }

    async loadData() {
        try {
            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'block';
            }

            // Simulate API call - Replace with actual API endpoint
            // const response = await fetch('/api/user/purchase-history');
            // purchaseHistory = await response.json();
            
            // Temporary simulation - Remove this when connecting to real API
            await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate loading
            
            this.renderTable();
        } catch (error) {
            console.error('Error loading data:', error);
            this.showError('Gagal memuat data. Silakan coba lagi nanti.');
        } finally {
            if (this.loadingIndicator) {
                this.loadingIndicator.style.display = 'none';
            }
        }
    }

    renderTable() {
        if (!this.tableBody) return;
        
        if (purchaseHistory.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <div class="empty-state-message">
                            Belum ada transaksi apapun
                        </div>
                    </td>
                </tr>`;
            return;
        }

        this.tableBody.innerHTML = purchaseHistory.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productName}</td>
                <td>${formatDate(item.purchaseDate)}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <span class="status ${item.paymentStatus.toLowerCase()}">
                        ${item.paymentStatus === 'SUCCESS' ? 'Berhasil' : 'Gagal'}
                    </span>
                </td>
            </tr>
        `).join('');
    }

    showError(message) {
        const errorDiv = document.createElement('div');
        errorDiv.className = 'error-message';
        errorDiv.textContent = message;
        
        // Remove existing error messages
        const existingError = document.querySelector('.error-message');
        if (existingError) {
            existingError.remove();
        }

        document.querySelector('.history-container').prepend(errorDiv);

        // Remove error message after 5 seconds
        setTimeout(() => {
            errorDiv.remove();
        }, 5000);
    }

    // Optional: Add search functionality
    searchTransactions(query) {
        const filteredHistory = purchaseHistory.filter(item => 
            item.productName.toLowerCase().includes(query.toLowerCase()) ||
            formatDate(item.purchaseDate).toLowerCase().includes(query.toLowerCase())
        );

        this.renderFilteredResults(filteredHistory);
    }

    renderFilteredResults(filteredData) {
        if (!this.tableBody) return;
        
        if (filteredData.length === 0) {
            this.tableBody.innerHTML = `
                <tr>
                    <td colspan="4" class="empty-state">
                        <div class="empty-state-message">
                            Tidak ada transaksi yang sesuai dengan pencarian
                        </div>
                    </td>
                </tr>`;
            return;
        }

        this.tableBody.innerHTML = filteredData.map((item, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${item.productName}</td>
                <td>${formatDate(item.purchaseDate)}</td>
                <td>${formatCurrency(item.price)}</td>
                <td>
                    <span class="status ${item.paymentStatus.toLowerCase()}">
                        ${item.paymentStatus === 'SUCCESS' ? 'Berhasil' : 'Gagal'}
                    </span>
                </td>
            </tr>
        `).join('');
    }
}

// Initialize the viewer
const purchaseViewer = new PurchaseHistoryViewer();

// Optional: Add search functionality
const searchInput = document.querySelector('#searchTransactions');
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        purchaseViewer.searchTransactions(e.target.value);
    });
}