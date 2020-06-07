import torch
import torch.nn as nn
from torchsummary import summary

x = 1
y = 16
z = 16

a = 1
b = 28
c = 28

def sMlAccuracyFunc(x, y, z, a, b, c):
    accuracy = ((z/c) * y) * 10
    return int(accuracy)

class SimpleConv(nn.Module):
    def __init__(self):
        super(SimpleConv, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 1, kernel_size=3, stride=1, padding=1),
            nn.ReLU(),
        )

    def forward(self, x, y):
        x1 = self.features(x)
        x2 = self.features(y)
        return x1, x2
    
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model = SimpleConv().to(device)
