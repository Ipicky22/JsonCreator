class App extends React.Component {

    state = {
        selected: null,
        value: null,

        initial: `{
            "module": "",
            "name": "",
            "portalid": 1,
            "workflow": true,
            "title": null,
            "action": null,
            "entrypoint": {
        
            }
        }`,

        crochet: `[

        ]`,

        crochet2: `[

        ],
        `,

        accolade: `{

        }`,

        accolade2: `{

        },
        `,

        block: `"type": "block",
        "title": " ",
        "module": " ",
        "fieldname": " ",
        "entrypoint": {

        }`,

        block2: `"type": "block",
        "title": " ",
        "module": " ",
        "fieldname": " ",
        "entrypoint": {

        },
        `,

        grid: `"type": "grid",
        "content": [

        ]`,

        grid2: `"type": "grid",
        "content": [

        ],
        `,

        field: `{
            "type": "field",
            "module": " ",
            "name": " ",
            "edit": true,
            "required": false,
            "label": true
        }`,

        field2: `{
            "type": "field",
            "module": " ",
            "name": " ",
            "edit": true,
            "required": false,
            "label": true
        },
        `,

        panel: `"type": "panel",
        "orientation": " ",
        "width": " ",
        "side": {

        }
        "content": {
            "type": "panel",
            "orientation": " ",
            "width": " ",
            "side": {

        }`,

        panel2: `"type": "panel",
        "orientation": " ",
        "width": " ",
        "side": {

        }
        "content": {
            "type": "panel",
            "orientation": " ",
            "width": " ",
            "side": {

        },
        `,

        "associated": `"type": "associatedmods",
        "module": " ",
        "relmodule": " ",
        "type_associate": " ",
        "relfieldname": " ",
        "actions": "select,remove",
        "content": [

        ]`,

        "associated2": `"type": "associatedmods",
        "module": " ",
        "relmodule": " ",
        "type_associate": " ",
        "relfieldname": " ",
        "actions": "select,remove",
        "content": [

        ],
        `
    }

    insertAtCursor (myField, myValue) {
        var myField = this.getDOMNode();
        // IE
        if (document.selection) {
            myField.focus();
            var sel = document.selection.createRange();
            sel.text = myValue;
        } 
        // FF
        else if (myField.selectionStart || myField.selectionStart == '0') {
            var startPos = myField.selectionStart;  var endPos = myField.selectionEnd;
            myField.value = myField.value.substring(0, startPos)
            + myValue + myField.value.substring(endPos, myField.value.length);
        } else {
            myField.value += myValue;
        }
    }

    insertAtCaret(areaId,text) {
		var txtarea = document.getElementById(areaId);
		var scrollPos = txtarea.scrollTop;
		var strPos = 0;
		var br = ((txtarea.selectionStart || txtarea.selectionStart == '0') ? 
			"ff" : (document.selection ? "ie" : false ) );
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			strPos = range.text.length;
		}
		else if (br == "ff") strPos = txtarea.selectionStart;
	
		var front = (txtarea.value).substring(0,strPos);  
		var back = (txtarea.value).substring(strPos,txtarea.value.length); 
		txtarea.value=front+text+back;
		strPos = strPos + text.length;
		if (br == "ie") { 
			txtarea.focus();
			var range = document.selection.createRange();
			range.moveStart ('character', -txtarea.value.length);
			range.moveStart ('character', strPos);
			range.moveEnd ('character', 0);
			range.select();
		}
		else if (br == "ff") {
			txtarea.selectionStart = strPos;
			txtarea.selectionEnd = strPos;
			txtarea.focus();
		}
		txtarea.scrollTop = scrollPos;
    }
    
    insertMyText = e => {
        let textToInsert = this.state.value
        let cursorPosition = e.target.selectionStart
        let textBeforeCursorPosition = e.target.value.substring(0, cursorPosition)
        let textAfterCursorPosition = e.target.value.substring(cursorPosition, e.target.value.length)
        e.target.value = textBeforeCursorPosition + textToInsert + textAfterCursorPosition
    }


    render() {

        const { initial, selected, crochet, crochet2, accolade, accolade2, block, block2, grid, grid2, field, field2, panel, panel2, associated, associated2 } = this.state

        return (
            <div style={{ display: "flex", 'flex-direction': 'row' }}>
                <div>
                    <textarea id="Expression" rows="75" cols="75" autofocus onClick={this.insertMyText} >{initial}</textarea>
                </div>

                <div style={{ display: "flex", flex: 1, "align-items": "center", "flex-direction": "column" }}>

                    <div>
                        <text>Selection Actuelle : {selected}</text>
                    </div>

                    <div>
                        <button onClick={() => this.setState({ selected: "Initial", value: initial })} >Initial</button>
                    </div>

                    <div style={{ display: "flex", 'flex-direction': 'row' }}>
                        <div style={{ display: "flex", 'flex-direction': 'column' }}>
                            <button onClick={() => this.setState({ selected: "Crochet", value: crochet })} >Crochet</button>
                            <button onClick={() => this.setState({ selected: "Accolade", value: accolade })} >Accolade</button>
                            <button onClick={() => this.setState({ selected: "Block", value: block })} >Block</button>
                            <button onClick={() => this.setState({ selected: "Grid", value: grid })} >Grid</button>
                            <button onClick={() => this.setState({ selected: "Field", value: field })} >Field</button>
                            <button onClick={() => this.setState({ selected: "Panel", value: panel })} >Panel</button>
                            <button onClick={() => this.setState({ selected: "Associatedmods", value: associated })} >Associatedmods</button>
                        </div>
                        <div style={{ display: "flex", 'flex-direction': 'column' }}>
                            <button onClick={() => this.setState({ selected: "Crochet ,", value: crochet2 })} >Crochet ,</button>
                            <button onClick={() => this.setState({ selected: "Accolade ,", value: accolade2 })} >Accolade ,</button>
                            <button onClick={() => this.setState({ selected: "block ,", value: block2 })} >block ,</button>
                            <button onClick={() => this.setState({ selected: "Grid ,", value: grid2 })} >Grid ,</button>
                            <button onClick={() => this.setState({ selected: "Field ,", value: field2 })} >Field ,</button>
                            <button onClick={() => this.setState({ selected: "Panel ,", value: panel2 })} >Panel ,</button>
                            <button onClick={() => this.setState({ selected: "Associatedmods ,", value: associated2 })} >Associatedmods ,</button>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById("root"))
