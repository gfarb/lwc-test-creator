const vscode = require('vscode');
const textEncoder = require('text-encoding-polyfill');
var extensionUri;
var lwcName;

/**
* @param {vscode.ExtensionContext} context
*/
function activate(context) {
    extensionUri = context.extensionUri;
    let disposable = vscode.commands.registerCommand('lwc-test-creator.createJestTest', function () {
        createJestTest();
    });
    context.subscriptions.push(disposable);
}

async function createJestTest() {
    lwcName = await userPrompt("LWC Test Creator: Enter Lightning Web Component Name...");
    await findLWC()
    .then((lwcPath) => { generateNewTest(lwcPath) })
    .catch((err) => { showError("LWC Test Creator: " + err) });
}

function showError(message) {
    console.error(message)
    vscode.window.showErrorMessage(message);
}

function showInfo(info) {
    vscode.window.showInformationMessage(info);
}

function userPrompt(prompt) {
    return vscode.window.showInputBox({placeHolder: prompt});
}

function findLWC() {
    return new Promise((resolve, reject) => {
        vscode.workspace.findFiles("**/" + lwcName + ".js", "**/.localdevserver/**")
        .then((lwcPaths) => {
            if(lwcPaths[0] === undefined) {
                reject("Couldn't Find Lightning Web Component \"" + lwcName + "\"");
            } else {
                const lwcPath = lwcPaths[0].path;
                resolve("/" + lwcPath.substring(lwcPath.indexOf("/")+1, lwcPath.lastIndexOf("/")));
            }
        })
    });
}

function generateNewTest(lwcPath) {
    const testFolderPath = vscode.Uri.file(lwcPath + "/__tests__");
    vscode.workspace.fs.createDirectory(testFolderPath)
    .then(() => {
        const wsedit = new vscode.WorkspaceEdit();
        const newFilePath = vscode.Uri.file(lwcPath + "/__tests__/" + lwcName + ".test.js");
        wsedit.createFile(newFilePath,{ignoreIfExists:false});
        writeToTestFile(wsedit, newFilePath);
    });
}

function writeToTestFile(wsedit, newFilePath) {
    vscode.workspace.fs.readFile(vscode.Uri.joinPath(extensionUri, 'testTemplate.js')).then((templateFileContent) => {
        const lwcNameForJestTest = lwcName.replace(/[A-Z]/g, capitalLetter => "-" + capitalLetter.toLowerCase());
        let testFile = templateFileContent.toString();
        testFile = testFile.replaceAll("{lwcName}", lwcName).replaceAll("{lwcNameForJestTest}", lwcNameForJestTest);
        const uint8array = new textEncoder.TextEncoder().encode(testFile);
        vscode.workspace.fs.writeFile(newFilePath, uint8array);
        vscode.workspace.applyEdit(wsedit)
        .then(() => {
            showInfo("LWC Test Creator: Created Jest Test for \"" + lwcName + "\"");
            vscode.window.showTextDocument(newFilePath);
        });
    });
}

function deactivate() {}

module.exports = {
    activate,
    deactivate
}