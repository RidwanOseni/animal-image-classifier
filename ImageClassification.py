# Import the needed libraries
import sys
from transformers import pipeline
from PIL import Image, ImageDraw

# Import the model and define the pipeline
checkpoint = "openai/clip-vit-large-patch14"
detector = pipeline(model=checkpoint, task="zero-shot-image-classification")

# Load the image passed as an argument to the script
filename = sys.argv[1]
image = Image.open(filename)

# Receive the list of objects to detect as user input
labels = input("Enter the labels you want to detect: ").split(" ")

# Run the pipeline and get the results
predictions = detector(
    image,
    candidate_labels=labels,
)

# Print the probabilities for each word
i=1
for prediction in predictions:
    label = prediction["label"]
    score = prediction["score"] * 100
    suffix = ''
    if 11 <= (i % 100) <= 13:
        suffix = 'th'
    else:
        suffix = ['th', 'st', 'nd', 'rd', 'th'][min(i % 10, 4)]
    print(f"The word {label} is the {i}{suffix} most related to the image with a confidence of {score:.2f}%")
    i+=1
