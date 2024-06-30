using System;
using System.Windows.Forms;
using System.Drawing;

namespace LogisticsManagement
{
    public class frmLogin : Form
    {
        #region UI elements
        Label txtTitle;
        Label txtDescription;

        // Label Username/Password
        Label lblUsername;
        Label lblPassword;

        // Username
        TextBox txtUsername;
        TextBox txtPassword;

        // Button Login
        Button btnLogin;
        Button btnRegister;

        #endregion

        #region UI
        private void InitializeComponent() 
        {
            this.Text = "Login";
            this.StartPosition = FormStartPosition.CenterScreen;
            this.MaximizeBox = false;
            this.FormBorderStyle = FormBorderStyle.FixedSingle;

            // Width, height
            this.Size = new Size(520, 255);

            txtTitle = new Label
            {
                AutoSize = true,
                Text = "Login",
                Font = new Font("Arial", 16, FontStyle.Bold),
                Location = new Point(225, 10)
            };

            txtDescription = new Label
            {
                Size = new Size(450, 30),
                Text = 
                    "Please login using your credentials. " + 
                    "Only administrators and staffs credentials will be allowed! " +
                    "If you weren't staffs or administrators, do not use this app! " +
                    "If you are new staff and don't have accounts, please press",
                Location = new Point(30, txtTitle.Location.Y + 40)
            };

            lblUsername = new Label
            {
                AutoSize = true,
                Text = "Username",
                Location = new Point(30, txtDescription.Location.Y + 45)
            };

            txtUsername = new TextBox
            {
                Text = "Required",
                Size = new Size(380, 18),
                Location = new Point(lblUsername.Location.X + lblUsername.Text.Length + 60, lblUsername.Location.Y - 2)
            };

            lblPassword = new Label
            {
                AutoSize = true,
                Text = "Password",
                Location = new Point(30, lblUsername.Location.Y + 35)
            };

            txtPassword = new TextBox
            {
                Text = "Required",
                Size = new Size(380, 18),
                Location = new Point(lblPassword.Location.X + lblPassword.Text.Length + 60, lblPassword.Location.Y - 2)
            };

            btnLogin = new Button
            {
                Text = "Login",
                Size = new Size(80, 28),
                Location = new Point(220, lblPassword.Location.Y + 35)
            };

            this.Controls.Add(txtTitle);
            this.Controls.Add(txtDescription);
            this.Controls.Add(lblUsername);
            this.Controls.Add(txtUsername);
            this.Controls.Add(lblPassword);
            this.Controls.Add(txtPassword);
            this.Controls.Add(btnLogin);
        }
        #endregion

        #region UI Event
        public frmLogin()
        {
            InitializeComponent();

            // Closing form event
            this.FormClosing += Handle_FormClosing;

            txtUsername.Enter += TxtUsername_Enter;
            txtUsername.Leave += TxtUsername_Leave;

            txtPassword.Enter += TxtPassword_Enter;
            txtPassword.Leave += TxtPassword_Leave;

            btnLogin.Click += BtnLogin_Click;

            DLLHelper.ToggleConsole(0);
        }
        #endregion

        #region Event handlers
        void Handle_FormClosing(object sender, FormClosingEventArgs e)
        {
            DialogResult result = MessageBox.Show("Do you want to exit? You need to login in the next time when you launch the application",
                "Confirm", MessageBoxButtons.YesNo, MessageBoxIcon.Asterisk);

            if (result == DialogResult.No)
            {
                e.Cancel = true;
            }
            else if (result == DialogResult.Yes)
            {
                int exitCode = DLLHelper.SQL_CloseDB();

                if (exitCode != 0)
                {
                    MessageBox.Show("Something went wrong when closing database!", "Native error",
                           MessageBoxButtons.OK, MessageBoxIcon.Error);

                    Environment.Exit(exitCode);
                }

                exitCode = DLLHelper.close();

                if (exitCode != 0)
                {
                    MessageBox.Show("Something went wrong!", "Native error", 
                        MessageBoxButtons.OK, MessageBoxIcon.Error);

                    Environment.Exit(exitCode);
                }

                // Continue anyway if exitCode is 0xFFFF or 0x0
                DLLHelper.ToggleConsole(1);
            }
        }

        // txtUsername
        void TxtUsername_Enter(object sender, EventArgs e)
        {
            if (txtUsername.Text == "Required")
            {
                txtUsername.Text = "";
            }
        }

        void TxtUsername_Leave(object sender, EventArgs e)
        {
            if (txtUsername.Text == "")
            {
                txtUsername.Text = "Required";
            }
        }

        // txtPassword
        void TxtPassword_Enter(object sender, EventArgs e)
        {
            if (txtPassword.Text == "Required")
            {
                txtPassword.Text = "";

                this.BeginInvoke(new Action(() =>
                {
                    txtPassword.UseSystemPasswordChar = true;
                }));
            }
        }

        void TxtPassword_Leave(object sender, EventArgs e)
        {
            if (txtPassword.Text == "")
            {
                txtPassword.Text = "Required";

                this.BeginInvoke(new Action(() =>
                {
                    txtPassword.UseSystemPasswordChar = false;
                }));
            }
        }

        void BtnLogin_Click(object sender, EventArgs e)
        {
            if ((txtUsername.Text == "" || txtUsername.Text == "Required") ||
                (txtPassword.Text == "" || txtPassword.Text == "Required"))
            {
                MessageBox.Show("Username and Password must not be null!", 
                    "Login error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                return;
            }
        }

        #endregion
    }
}
