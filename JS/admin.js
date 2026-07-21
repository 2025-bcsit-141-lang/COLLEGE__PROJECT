        
        const ADMIN_CREDENTIALS = {
            username: 'admin',
            password: 'admin123'
        };
        
        // Check if already logged in
        if (sessionStorage.getItem('adminLoggedIn') === 'true') {
            document.getElementById('loginOverlay').style.display = 'none';
            document.getElementById('adminDashboard').style.display = 'block';
            loadSubmissions();
        }
        
        // Login
        function loginAdmin() {
            const username = document.getElementById('adminUsername').value;
            const password = document.getElementById('adminPassword').value;
            const error = document.getElementById('loginError');
            
            if (username === ADMIN_CREDENTIALS.username && password === ADMIN_CREDENTIALS.password) {
                sessionStorage.setItem('adminLoggedIn', 'true');
                document.getElementById('loginOverlay').style.display = 'none';
                document.getElementById('adminDashboard').style.display = 'block';
                loadSubmissions();
                error.textContent = '';
            } else {
                error.textContent = 'invalid credentials';
                setTimeout(() => { error.textContent = ''; }, 3000);
            }
        }
        
        // Logout
        function logoutAdmin() {
            if (confirm('logout?')) {
                sessionStorage.removeItem('adminLoggedIn');
                document.getElementById('loginOverlay').style.display = 'flex';
                document.getElementById('adminDashboard').style.display = 'none';
            }
        }
        
        // Load submissions
        function loadSubmissions() {
            const submissions = JSON.parse(localStorage.getItem('formSubmissions')) || [];
            renderSubmissions(submissions);
        }
        