import tl = require('azure-pipelines-task-lib/task');
import * as azdev from "azure-devops-node-api";
import { v4 as uuidv4 } from 'uuid';


async function run() {	
  try {	
    const docId = uuidv4();
    console.log("create document with Id: ", docId);  
    const organizationUrl = String(tl.getVariable('System.TeamFoundationCollectionUri'));
    let token = String(tl.getVariable('System.AccessToken'));
    console.log(' ************** Task Init:01 ******************************')    
    const azDevConnection = azdev.WebApi.createWithBearerToken(organizationUrl, token);
    const eManager = await azDevConnection.getExtensionManagementApi();
    const collectionName = 'doc-poc'; // Replace with your collection name
    const documentId = 'doc1'; // Replace with your document ID
    const documentContent = {
    name: 'My Document',
      description: 'This is a sample document.',
      // Add any other properties or content you want for your document
    };
    var myDoc = {
        id: docId,
        fullScreen: false,
        screenWidth: 500
    };
	console.log('eManager 1 ', eManager)	
    const document = await eManager.createDocumentByName(
         myDoc,
        'vasanthan297', 
        'build-release-task',
        'Default',
        'Current',
         collectionName
       
      );
    console.log('Document created successfully.');	       
    // get  document
    const document2 = await eManager.getDocumentByName(
        'vasanthan297', // is there a way to get a publisher?
        'build-release-task', // is there a way to get an extension id?
        'Default',
        'Current',
         collectionName,
         myDoc.id        
      );      
    console.log('Retrived saved document successfully:', document2)
    tl.setResult(tl.TaskResult.Succeeded, "Build passed successfully");		
    } catch (error: any) {
        tl.debug('Caught an error in main: ' + error);
        tl.setResult(tl.TaskResult.Failed, error);
    }
}
run();
