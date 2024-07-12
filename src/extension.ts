import * as vscode from "vscode";

export function activate(context: vscode.ExtensionContext) {
	let disposable = vscode.commands.registerCommand(
		"el-input-replacer.replaceElInput",
		() => {
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
				const fullRange = new vscode.Range(
					document.positionAt(0),
					document.positionAt(text.length)
				);

				editor
					.edit((editBuilder) => {
						editBuilder.replace(fullRange, newText);
					})
					.then((success) => {
						if (success) {
							vscode.window.showInformationMessage(
								"Replaced el-input tags with input tags"
							);
						} else {
							vscode.window.showErrorMessage(
								"Failed to replace el-input tags"
							);
						}
					});
			} else {
				vscode.window.showErrorMessage("No active editor");
			}
		}
	);

	context.subscriptions.push(disposable);
}

export function deactivate() {}
