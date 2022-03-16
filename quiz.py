from random import randint
import json
from os import getcwd


class json_q:

  def __init__(self, us = "general.json"):
      
      with open(f"{getcwd()}/static/{us}") as f:
        self.st = json.load(f)

        self.ln = len(self.st)

  def rand_q(self,n=1):

    l  = []
    for _ in range(n):

        r = randint(1,self.ln-1)
        d = self.st[r:r+1][0]

        q = (d.get("Questions"),
                    [d.get(i) for i in ["A","B","C","D"]],
                    d["Correct"])

        l.append((q,r))
    
    return json.dumps(l)