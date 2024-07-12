"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.activate = activate;
exports.deactivate = deactivate;
const vscode = __importStar(require("vscode"));
function activate(context) {
    let disposable = vscode.commands.registerCommand("el-input-replacer.replaceElInput", () => {
        const editor = vscode.window.activeTextEditor;
        if (editor) {
            const document = editor.document;
            const text = document.getText();
            // Regular expression to match <el-input> tags
            const regex = /<el-input([^>]*)>/g;
            const newText = text.replace(regex, (match, attributes) => {
                // Convert v-model to value
                attributes = attributes.replace(/v-model="/g, 'value="');
                // Remove any Element UI specific attributes
                attributes = attributes.replace(/:([\w-]+)=/g, "$1=");
                return `<input${attributes}>`;
            });
            // Replace the entire text of the document
            const fullRange = new vscode.Range(document.positionAt(0), document.positionAt(text.length));
            editor
                .edit((editBuilder) => {
                editBuilder.replace(fullRange, newText);
            })
                .then((success) => {
                if (success) {
                    vscode.window.showInformationMessage("Replaced el-input tags with input tags");
                }
                else {
                    vscode.window.showErrorMessage("Failed to replace el-input tags");
                }
            });
        }
        else {
            vscode.window.showErrorMessage("No active editor");
        }
    });
    context.subscriptions.push(disposable);
}
function deactivate() { }
//# sourceMappingURL=extension.js.map