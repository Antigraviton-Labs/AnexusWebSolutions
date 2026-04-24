from PIL import Image, ImageDraw, ImageFont
import os

# Create output directory
output_dir = os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "favicon")
os.makedirs(output_dir, exist_ok=True)

# Favicon sizes
sizes = [16, 32, 48, 64, 96, 128, 192, 256]
ico_sizes = [16, 32, 48]

# Professional blue color scheme
bg_color = "#0F4C75"      # Deep professional blue
accent_color = "#00B4D8"   # Bright cyan accent
text_color = "#FFFFFF"     # White

for size in sizes:
    # Create square image with high quality
    img = Image.new('RGBA', (size, size), bg_color)
    draw = ImageDraw.Draw(img)

    # Add subtle rounded rectangle background
    padding = max(1, size // 16)
    radius = size // 4
    draw.rounded_rectangle(
        [padding, padding, size - padding, size - padding],
        radius=radius,
        fill=bg_color,
        outline=accent_color,
        width=max(1, size // 32)
    )

    # Draw "A" letter
    try:
        # Try to use a nice font
        font_size = int(size * 0.6)
        font = ImageFont.truetype("arial.ttf", font_size)
    except:
        font = ImageFont.load_default()

    # Get text bounding box for centering
    text = "A"
    bbox = draw.textbbox((0, 0), text, font=font)
    text_width = bbox[2] - bbox[0]
    text_height = bbox[3] - bbox[1]

    x = (size - text_width) // 2
    y = (size - text_height) // 2 - int(size * 0.05)

    # Draw text with subtle shadow
    shadow_offset = max(1, size // 32)
    draw.text((x + shadow_offset, y + shadow_offset), text, font=font, fill="#00000040")
    draw.text((x, y), text, font=font, fill=text_color)

    # Save PNG
    img.save(os.path.join(output_dir, f"favicon-{size}x{size}.png"), "PNG")

# Generate favicon.ico with multiple sizes
ico_images = []
for size in ico_sizes:
    img = Image.open(os.path.join(output_dir, f"favicon-{size}x{size}.png"))
    ico_images.append(img)

# Save .ico file
ico_path = os.path.join(output_dir, "favicon.ico")
ico_images[0].save(
    ico_path,
    format='ICO',
    sizes=[(s, s) for s in ico_sizes],
    append_images=ico_images[1:]
)

# Also save a high-res favicon.png at root of public
Image.open(os.path.join(output_dir, "favicon-256x256.png")).save(
    os.path.join(os.path.dirname(os.path.abspath(__file__)), "public", "favicon.png"), "PNG"
)

print("Favicon generated successfully!")
print(f"Files saved to: {output_dir}")
