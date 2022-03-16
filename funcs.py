from os.path import isfile
import json

def update_json(fp, d):
  """
  Updates a json from path with da d
  """

  print(fp)
  print(d)
  
  if isfile(fp):
    
    with open(fp, "r") as f:
      data = json.load(f)

    if type(data) == type(dict()):
      data.update(d)
    elif type(data) == type(list()):
      data.append(d)
    else:
      data+=d

    with open(fp, "w") as f:
      json.dump(data, f)

  else:
    
    with open(fp, "w") as f:
      json.dump([d], f)
    

