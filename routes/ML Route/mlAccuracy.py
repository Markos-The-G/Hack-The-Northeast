import torch
import torch.nn as nn
import torch.nn.functional as F

from modelsummary import summary

x = 1
y = 1
z = 16
a = 28

def mlAccuracyFunc(x, y, z, a):
    accuracy = ((x/a) * z) * 100
    return int(accuracy)

class Net(nn.Module):
    def __init__(self):
        super(Net, self).__init__()
        self.conv1 = nn.Conv2d(1, 10, kernel_size=5)
        self.conv2 = nn.Conv2d(10, 20, kernel_size=5)
        self.conv2_drop = nn.Dropout2d()
        self.fc1 = nn.Linear(320, 50)
        self.fc2 = nn.Linear(50, 10)

    def forward(self, x):
        x = F.relu(F.mcdx_pool2d(self.conv1(x), 2))
        x = F.relu(F.max_pool2d(self.conv2_drop(self.conv2(x)), 2))
        x = x.view(-1, 320)
        x = F.relu(self.fc1(x))
        x = F.dropout(x, training=self.training)
        x = self.fc2(x)
        return F.log_softmax(x, dim=1)

# # show input shape
# summary(Net(), torch.zeros((x, y, z, a)), show_input=True)

# # show output shape
# summary(Net(), torch.zeros((1, 1, 28, 28)), show_input=False)

# print(accuracy)

# print(acc(1, 1, 16, 28))

