using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Media;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace TLUAccountScanner
{
    public partial class Form1 : Form
    {
        private SoundPlayer sndPlayer;
        private Dictionary<Button, bool> buttonPressedStates = new Dictionary<Button, bool>();

        private Dictionary<string, bool> buttonControlPressedStates = new Dictionary<string, bool>
        {
            { "minimize", false },
            { "maximize", false },
            { "close", false }
        };

        public Form1()
        {
            InitializeComponent();
            this.FormBorderStyle = FormBorderStyle.None;
            this.BackColor = Color.FromArgb(40, 40, 40);
            this.ForeColor = Color.White;
            this.FormClosing += Form1_FormClosing;
        }

        private void UpdateButtonState(Point location, bool isPressed)
        {
            // Define the bounds of each button
            Rectangle minimizeButtonBounds = new Rectangle(this.Width - 90, 0, 30, 30);
            Rectangle maximizeButtonBounds = new Rectangle(this.Width - 60, 0, 30, 30);
            Rectangle closeButtonBounds = new Rectangle(this.Width - 30, 0, 30, 30);

            // Check if the mouse click is within the bounds of any button
            if (minimizeButtonBounds.Contains(location))
            {
                buttonControlPressedStates["minimize"] = isPressed;
            }
            else if (maximizeButtonBounds.Contains(location))
            {
                buttonControlPressedStates["maximize"] = isPressed;
            }
            else if (closeButtonBounds.Contains(location))
            {
                buttonControlPressedStates["close"] = isPressed;
            }

            // Redraw the form to reflect the change
            this.Invalidate();
        }

        private void RestoreButtonStates()
        {
            Rectangle minimizeButtonBounds = new Rectangle(this.Width - 90, 0, 30, 30);
            Rectangle maximizeButtonBounds = new Rectangle(this.Width - 60, 0, 30, 30);
            Rectangle closeButtonBounds = new Rectangle(this.Width - 30, 0, 30, 30);

            buttonControlPressedStates["minimize"] = false;
            buttonControlPressedStates["maximize"] = false;
            buttonControlPressedStates["close"] = false;

            // Redraw the form to reflect the change
            this.Invalidate();
        }

        private void Form1_FormClosing(object sender, FormClosingEventArgs e)
        {
            sndPlayer = new SoundPlayer(AppDomain.CurrentDomain.BaseDirectory + "notify.wav");
            sndPlayer.LoadAsync();
            sndPlayer.Play();

            if (DialogResult.Yes == MessageBox.Show("Are you sure you want to exit?", "Confirm Exit", MessageBoxButtons.YesNoCancel))
            {
                e.Cancel = false;
            }
            else
            {
                e.Cancel = true;
                RestoreButtonStates();
            }
        }
    }
}
