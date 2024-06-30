using System;
using System.Runtime.InteropServices;
using System.Windows.Forms;

namespace LogisticsManagement
{
    public class DLLHelper
    {
        // private function
        // DO NOT USE!!!
        // Disable Console mode
        [DllImport("kernel32.dll")]
        public static extern IntPtr GetConsoleWindow();

        [DllImport("user32.dll")]
        public static extern bool ShowWindow(IntPtr hWnd, int nCmdShow);

        public const int SW_HIDE = 0;
        public const int SW_SHOW = 5;

        // Test function
        /*
        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int Add(int a, int b);
        */      

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Auto)]
        public static extern int init();

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int close();

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int SQL_OpenDB(IntPtr filename);

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int SQL_CloseDB();

        public delegate int DataCallback(IntPtr data, int argc, string[] argv, string[] azColName);

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int callback(IntPtr data, int argc, string[] argv, string[] azColName);

        [DllImport("project.dll", CallingConvention = CallingConvention.Cdecl, CharSet = CharSet.Ansi)]
        public static extern int SQL_Exec(IntPtr query_str);

        public static IntPtr handle { get; set; }

        public static IntPtr PassAsConstCharPtr(string strInput = "")
        {
            IntPtr ptr = IntPtr.Zero;

            if (String.IsNullOrEmpty(strInput))
            {
                MessageBox.Show("strInput must not be null!", "Error native library",
                    MessageBoxButtons.OK, MessageBoxIcon.Error);
            }
            else
            {
                try
                {
                    byte[] buffer = System.Text.Encoding.ASCII.GetBytes(strInput + "\0");

                    ptr = Marshal.AllocHGlobal(buffer.Length);
                    Marshal.Copy(buffer, 0, ptr, buffer.Length);
                }
                catch (Exception ex)
                {
                    Console.WriteLine(ex.Message);

                    // ptr unchanged
                }
            }

            return ptr;
        }

        public static void ToggleConsole(int showStatus = 0)
        {
            if (handle == IntPtr.Zero)
            {
                handle = DLLHelper.GetConsoleWindow();
            }

            if (showStatus == 1)
            {
                ShowWindow(handle, SW_SHOW);
            }
            else if (showStatus == 0)
            {
                ShowWindow(handle, SW_HIDE);
            }
            else
            {
                // Not execute if showStatus is not 0 or 1 and showStatus is different value instead
                return;
            }
        }
    }
}
