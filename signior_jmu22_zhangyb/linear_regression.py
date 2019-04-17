import urllib.request
import json
import dml
import prov.model
import datetime
import uuid
import urllib.request
import pandas as pd
import statistics
import numpy as np
from scipy import polyfit
import matplotlib.pyplot as plt



class linear_regression(dml.Algorithm):
  contributor = 'signior_jmu22_zhangyb'
  reads = ['signior_jmu22_zhangyb.countries_change_in_carbon_after_year']
  writes = ['signior_jmu22_zhangyb.linear_regression']

  @staticmethod
  def execute(trial = False):
    startTime = datetime.datetime.now()

    # Set up database connection
    client = dml.pymongo.MongoClient()
    repo = client.repo
    repo.authenticate('signior_jmu22_zhangyb', 'signior_jmu22_zhangyb')
    
    temp = list(repo.signior_jmu22_zhangyb.countries_change_in_carbon_after_year.find())
    df = pd.DataFrame(temp)
    results = df.to_dict(orient = "records")
    #print(results)
    
    templist = []
 
    range_arr = list(range(1960, 2018))

    
    for rows in results:
        tempX = []
        tempY = []
        if len((rows.get('data'))) >= 3:
#            print(rows.get('data'))
            for entry in rows.get('data'):
                for i in range_arr:
                    if entry.get(str(i)) is None:
                        continue
                    else:
#                        print(entry.get(str(i)))
                        tempX.append(entry.get(str(i))[0])
                        tempY.append(entry.get(str(i))[1])
        
            
            
            templist.append((rows.get('country'), tempX, tempY))
    #print(templist)
    
        
    
    
    #item[1] == x item[2] = y
    for item in templist:
        corrcoeff = round(np.corrcoef(item[1], item[2])[1,0],2)
        pl = polyfit(item[1], item[2], 1)
        plt.figure()
        plt.figtext(0,1,"Country: " + str(item[0]) +" CorrCoeff: "+str(corrcoeff))
        plt.plot(item[1], item[2], 'o')
        plt.plot(item[1],np.polyval(pl,item[1]), 'r--')
      
        
        
                        
               

    
    
    
#    
#    repo.dropCollection("linear_regression")
#    repo.createCollection("linear_regression")
#    repo['signior_jmu22_zhangyb.linear_regression'].insert_many(results)
#    repo['signior_jmu22_zhangyb.linear_regression'].metadata({'complete': True})
#
#    print(repo['signior_jmu22_zhangyb.population'].metadata())
#
#    repo.logout()
#
#    endTime = datetime.datetime.now()
#    return {"start": startTime, "end": endTime}
#    
  
  @staticmethod
  def provenance(doc = prov.model.ProvDocument(), startTime = None, endTime = None):
    client = dml.pymongo.MongoClient()
    repo = client.repo
    repo.authenticate('signior_jmu22_zhangyb', 'signior_jmu22_zhangyb')
    doc.add_namespace('alg', 'http://datamechanics.io/algorithm/signior_jmu22') # The scripts are in <folder>#<filename> format
    doc.add_namespace('dat', 'http://datamechanics.io/data/signior_jmu22' ) # The datasets are in <user>#<collection> format
    doc.add_namespace('ont', 'http://datamechanics.io/ontology#') # 'Extension', 'DataResource', 'DataSet', 'Retreival', 'Query', or 'Computation'
    doc.add_namespace('log', 'http://datamechanics.io/log/')

    this_script = doc.agent('alg:signior_jmu22#population', {prov.model.PROV_TYPE:prov.model.PROV['SoftwareAgent'], 'ont:Extension': 'py'})
    resource = doc.entity('dat:population', {'prov:label': 'Yearly Population by Country 1960 - 2017', prov.model.PROV_TYPE: 'ont:DataResource', 'ont:Extension': 'csv'})
    get_population = doc.activity('log:uuid' + str(uuid.uuid4()), startTime, endTime)
    doc.wasAssociatedWith(get_population, this_script)
    doc.usage(get_population, resource, startTime, None, {prov.model.PROV_TYPE:'ont:Retreival'})
    
    population = doc.entity('dat:signior_jmu22#population', {prov.model.PROV_LABEL: 'Population by Country (yearly)', prov.model.PROV_TYPE: 'ont:DataSet'})
    doc.wasAttributedTo(population, this_script)
    doc.wasGeneratedBy(population, get_population, endTime)
    doc.wasDerivedFrom(population, resource, get_population, get_population, get_population)

    repo.logout()


    return doc



# comment this when submitting, just for testing purposes
linear_regression.execute()
# doc = population.provenance()
# print(doc.get_provn())
# print(json.dumps(json.loads(doc.serialize()), indent=4))
  