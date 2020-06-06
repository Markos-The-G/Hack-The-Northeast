import torch
import numpy as np
import cv2
from model import UNet, LC2RGB
import time

img_path = "test.jpg"

model = UNet()
model.load_state_dict(torch.load("0.pth", map_location = torch.device("cpu")))

img = cv2.imread(img_path)
img = cv2.resize(img, (256, 256))
img = 2*(img/255) - 1

output = model.generate(torch.Tensor(img).permute(2, 0, 1).view(1, 3, 256, 256))

img = (img + 1) / 2
output = output / 255

print(img.shape)

# cv2.imshow("Input", cv2.cvtColor(img, cv2.COLOR_RGB2BGR))
# cv2.imshow("Output", cv2.cvtColor(output.astype("float32"), cv2.COLOR_RGB2BGR))
# cv2.waitKey(0)



correct = 0
total = 0

# with torch.no_grad():
#     for data in testloader:
#         images, lables = data
#         outputs = net(images)
#         _, predicted = torch.max(outputs.data, 1)
#         total += lables.size(0)
#         correct += (predicted == lables).sum().item()

# print('Accuracy is: %d %%' % (100*correct/total))
