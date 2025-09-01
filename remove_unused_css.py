#!/usr/bin/env python3
import re

# Read the CSS file
with open('src/App.css', 'r') as f:
    css_content = f.read()

# List of unused classes to remove
unused_classes = [
    'allteamclipdiv', 'background', 'backgrounddiv', 'backgroundlogoimage', 'body',
    'chevron', 'cliplightbox', 'code-embed', 'describingtext', 'describingtextdiv',
    'describingtextframediv', 'div-block-2', 'div-block-6', 'facebooklogo',
    'footercontainer', 'herotitleh1', 'image-10', 'image-2', 'image-4', 'image-5',
    'image-6', 'image-7', 'image-8', 'image-9', 'insightcontainer', 'insightheaderdiv',
    'insightheadertext', 'insightheadertextdiv', 'jobopeingtitlediv', 'jobopeningpagediv',
    'jobstatustext', 'lighboxthumbnail', 'logo', 'logodiv', 'loopphoto', 'mask',
    'mask-2', 'navbardiv', 'oprningscontainer', 'photodiv', 'photoloopdiv',
    'photoverticaldiv', 'playicon', 'slide', 'slide-1', 'slide-2', 'slide-3',
    'slide-4', 'slide-4-copy', 'slide-5', 'slide-6', 'slide-nav', 'slider',
    'slider-2', 'socialmediadiv', 'socialmedialink', 'startbreakdiv', 'stopbreakdiv',
    'talentdiv', 'talenthead2text', 'teamclipdiv', 'teamtitletext', 'text-block-3',
    'text-span-2', 'text-span-3', 'utility-page-content', 'utility-page-form',
    'utility-page-wrap', 'videodiv', 'workingcontainer', 'workingheaderdiv',
    'workingheadergradienttext', 'workingheadertext', 'workingheadertextdiv', 'workingsection'
]

# Remove CSS rules for unused classes
for class_name in unused_classes:
    # Pattern to match CSS rules for the class (including pseudo-classes and media queries)
    pattern = r'\.' + re.escape(class_name) + r'[^}]*{[^}]*}'
    css_content = re.sub(pattern, '', css_content, flags=re.DOTALL)
    
    # Also remove any remaining references in media queries
    pattern = r'@media[^{]*{[^}]*\.' + re.escape(class_name) + r'[^}]*{[^}]*}[^}]*}'
    css_content = re.sub(pattern, '', css_content, flags=re.DOTALL)

# Clean up multiple empty lines
css_content = re.sub(r'\n\s*\n\s*\n', '\n\n', css_content)

# Write the cleaned CSS back to the file
with open('src/App.css', 'w') as f:
    f.write(css_content)

print("Unused CSS classes have been removed from src/App.css")
