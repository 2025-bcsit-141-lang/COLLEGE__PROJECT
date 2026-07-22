        
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
        // Render submissions
        function renderSubmissions(submissions) {
            const list = document.getElementById('submissionsList');
            
            if (!submissions || submissions.length === 0) {
                list.innerHTML = `
                    <div class="empty-state">
                        <div class="icon">—</div>
                        <h3>no submissions</h3>
                        <p>form data will appear here</p>
                    </div>
                `;
                return;
            }
            
            const sorted = [...submissions].reverse();
            
            list.innerHTML = sorted.map((sub) => {
                const initials = sub.name ? sub.name.split(' ').map(n => n[0]).join('').toUpperCase() : '?';
                
                return `
                    <div class="submission-card">
                        <div class="submission-header">
                            <div class="submission-sender">
                                <div class="submission-avatar">${initials}</div>
                                <div>
                                    <div class="submission-name">${sub.name || 'Anonymous'}</div>
                                    <div class="submission-email">${sub.email || 'no email'}</div>
                                </div>
                            </div>
                            <div class="submission-time">${sub.timestamp || 'unknown'}</div>
                        </div>
                        <div class="submission-subject"><span class="subjection-label">subject</span> ${sub.subject || 'no subject'}</div>
                        <div class="submission-message">${sub.message || 'no message'}</div>
                        <div class="submission-id">${sub.id}</div>
                    </div>
                `;
            }).join('');
        }
        