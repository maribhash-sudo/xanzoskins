const App = {
    balance: 10000,

    init() {
        // Balansni yuklash
        const saved = localStorage.getItem('userBalance');
        if (saved) this.balance = parseInt(saved);
        this.renderBonus();
        this.updateUI();
    },

    updateUI() {
        const balEl = document.getElementById('user-balance');
        if (balEl) balEl.innerText = this.balance;
        localStorage.setItem('userBalance', this.balance);
    },

    view(pageId, btn) {
        document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
        document.getElementById('page-' + pageId).classList.add('active');
        document.querySelectorAll('.nav-btn').forEach(b => b.classList.remove('active'));
        if(btn) btn.classList.add('active');
    },

    renderBonus() {
        const list = document.getElementById('bonus-list');
        list.innerHTML = `
            <div class="card-box">
                <div><h4>Kunlik bonus</h4><p>+500 COIN</p></div>
                <button onclick="App.addBalance(500)">OLISH</button>
            </div>
            <div class="card-box">
                <div><h4>Telegram</h4><p>+150 COIN</p></div>
                <button onclick="App.addBalance(150)">OBUNA</button>
            </div>
        `;
    },

    addBalance(amount) {
        this.balance += amount;
        this.updateUI();
        alert("Balans yangilandi: +" + amount);
    }
};

document.addEventListener('DOMContentLoaded', () => App.init());
