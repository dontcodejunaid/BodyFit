$code = @"
using System;
using System.Drawing;
using System.Drawing.Imaging;

public class LogoCropper {
    public static void Crop() {
        using (Bitmap src = new Bitmap(@"c:\BodyFit\src\assets\logo.png")) {
            Rectangle cropArea = new Rectangle(110, 130, 310, 200);
            using (Bitmap target = new Bitmap(cropArea.Width, cropArea.Height)) {
                using (Graphics g = Graphics.FromImage(target)) {
                    g.DrawImage(src, new Rectangle(0, 0, target.Width, target.Height), cropArea, GraphicsUnit.Pixel);
                }
                target.Save(@"c:\BodyFit\public\favicon.png", ImageFormat.Png);
            }
        }
    }
}
"@

Add-Type -TypeDefinition $code -ReferencedAssemblies System.Drawing
[LogoCropper]::Crop()
