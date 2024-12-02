import sys
from PIL import Image
from transformers import pipeline

# Define the model and pipeline
checkpoint = "openai/clip-vit-large-patch14"
detector = pipeline(model=checkpoint, task="zero-shot-image-classification")

# Load the image passed as an argument
filename = sys.argv[1]
image = Image.open(filename)

# Mock result for quick testing
if len(sys.argv) == 3 and sys.argv[2].lower() == "mock":
    print("The image is classified as 'dog' with a confidence of 95.00%")
else:
    # Uncomment this section to enable real classification
    """
    # Get the labels from the user or as script arguments
    labels = sys.argv[2:]  # Labels passed as arguments
    if not labels:
        labels = input("Enter the labels you want to detect: ").split(" ")
    
    # Run the pipeline and get the results
    predictions = detector(image, candidate_labels=labels)
    
    # Print the probabilities for each label
    i = 1
    for prediction in predictions:
        label = prediction["label"]
        score = prediction["score"] * 100
        suffix = ''
        if 11 <= (i % 100) <= 13:
            suffix = 'th'
        else:
            suffix = ['th', 'st', 'nd', 'rd', 'th'][min(i % 10, 4)]
        print(f"The word {label} is the {i}{suffix} most related to the image with a confidence of {score:.2f}%")
        i += 1
    """
