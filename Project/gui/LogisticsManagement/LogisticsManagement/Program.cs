using System;
using System.IO;
using System.Windows.Forms;

namespace LogisticsManagement
{
    public class Program
    {
        public static void Main()
        {
            DLLHelper.ToggleConsole(0);

            int exitCode = DLLHelper.init();

            if (exitCode != 0)
            {
                MessageBox.Show("Something went wrong!");
                Environment.Exit(exitCode);
            }
            else
            {
                int db_code = DLLHelper.SQL_OpenDB(DLLHelper.PassAsConstCharPtr("database.db"));

                if (db_code != 0)
                {
                    MessageBox.Show("Something went wrong!", "Native error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                    return;
                }
                else
                {
                    if (new FileInfo("database.db").Length < 1)
                    {
                        // Database corrupt or newly created
                        string query_db = 
                            "CREATE TABLE admin_users ( " +
                            "id INTEGER PRIMARY KEY, " +
                            "username TEXT, " +
                            "password TEXT, " +
                            "email TEXT, " +
                            "full_name TEXT );";
                        int exit_code = DLLHelper.SQL_Exec(DLLHelper.PassAsConstCharPtr(query_db));

                        if (exit_code != 0)
                        {
                            MessageBox.Show("Database cannot be created!", "Native error", MessageBoxButtons.OK, MessageBoxIcon.Error);
                            return;
                        }
                    }
                    Application.EnableVisualStyles();
                    Application.SetCompatibleTextRenderingDefault(false);
                    Application.Run(new frmLogin());
                }
            }
        }
    }
}
