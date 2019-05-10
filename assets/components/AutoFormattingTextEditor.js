
/*
* This component implements <input type=text> element on the page with the following rules:
* - only digits are allowed
* - groups all digits into groups of 3. So "1234" will be formatted as -> "1 234"
* - size of element is flexible and adapts to the content
*/

Vue.component( "auto-formatting-text-editor", {
	props: ["value", "id"],
	template: 
`
	<div style="display: inline">
		<input class="text-input"
			type="text" 
			v-model="myValue" 
			ref="domInput"
			@input="onInput"
			@keydown="onKeydown">
	</div>
`,
	data() {
		return {
			myValue : this.value,
			myId : this.id || 0,
			caret: 0,
			keyInfo: {
				wasDel: false,
				wasBackspace: false,
				assumeBackspace: false,
				assumeDel: false,
				left: false,
				right: false
			}
		}
	},
	created() {
	},
	mounted() {
		// adapt field size to initial value
		this.updateDataFromProps();
	},
	updated() {
		this.setCaret( this.caret );
	},
	watch: 
	{
		value() {
			this.updateDataFromProps();
		}
	},
	methods: {

		/* 
		* Adapts input's size according to the content.
		*/ 
		updateInputSize() {
			const maxSize = 50;
			const minSize = 4;
			let size = minSize; 
			if ( this.myValue.length >= 4)
				size = this.myValue.length > maxSize ? maxSize + 1 : this.myValue.length+1;
			this.$refs.domInput.size = size;
		},

		/*
		* When the value comes to us changed – make sure that: 
		* - there is nothing but digits
		* - make formatting.
		* - don't forget about proper caret positioning in the input element!
		*/
		onInput(e) {

			// save current caret position
			this.caret = this.currentCaret();
			
			// processing of backspace and del operations
			let preProcessingResult = this.preProcess( this.caret );

			// take out preprocessed value and new caret position
			let valPreProcessed = preProcessingResult.value;
			this.caret = preProcessingResult.caret;

			// make formatting
			let strNoSpaces = ValueFormatter.deleteSeparators( valPreProcessed );
			strNoSpaces = ValueFormatter.fixValue( strNoSpaces );
			this.myValue = ValueFormatter.format( strNoSpaces );

			// recalculate caret position after formatting
			this.caret += (this.myValue.length - valPreProcessed.length); 

			// jump over separator if we stay on it and there was DEL pressed
			if ( this.keyInfo.wasDel ) {
				if ( this.myValue[this.caret]==AutoFormattingTextEditonSettings.separator )
					this.caret++;
			}
			// jump over separator if we stay before it and there was BACKSPACE pressed
			else if ( this.keyInfo.wasBackspace ) {
				if ( this.caret>0 && this.myValue[this.caret-1]==AutoFormattingTextEditonSettings.separator )
				this.caret--;
			}

			// make sure it is not negative, otherwise the caret will go to the end of input
			if (this.caret < 0) this.caret = 0;

			this.updateInputSize();
			this.$emit( "input", {value: this.myValue, id: this.myId} );
		},

		onKeydown(e) {

			const caret = this.currentCaret();
			const BACKSPACE = 8;
			const DEL = 46;
			const LEFT=37;
			const RIGHT = 39;
			const lastKey = event.keyCode || event.charCode;

			this.keyInfo.left = lastKey==LEFT;
			this.keyInfo.right = lastKey==RIGHT;

			this.keyInfo.wasDel = lastKey==DEL;
			this.keyInfo.wasBackspace = lastKey==BACKSPACE;

			// find out should be take into consideration backspace/delete for preProcessing
			// we only take them into consideration if the char being deleted is space (" ")
			this.keyInfo.assumeBackspace = (this.keyInfo.wasBackspace && caret > 0 && this.myValue[caret-1] == AutoFormattingTextEditonSettings.separator);
			this.keyInfo.assumeDel = (this.keyInfo.wasDel && this.myValue[caret] == AutoFormattingTextEditonSettings.separator);

			// if left or right moves to separator - jump over to skip it
			if ( this.keyInfo.left && caret > 0 && this.myValue[caret-1]==AutoFormattingTextEditonSettings.separator)
			 	this.setCaret( caret - 1 );

			if (this.keyInfo.right && caret < this.myValue.length && this.myValue[caret+1]==AutoFormattingTextEditonSettings.separator)
			 	this.setCaret( caret + 1 );
		},

		/*
		* The parent component gave us some value. Fix and format it!
		*/
		updateDataFromProps() {
			this.myValue = ValueFormatter.format( ValueFormatter.deleteSeparators( ValueFormatter.fixValue( this.value || "" ) ) );
			this.updateInputSize();
		},

		/* 
		* "Del" and "backspace" correct processing.
		*/
		preProcess( caret ) {
			let result = this.myValue;
			let indexToDelete = -1;

			let newCaret = caret;

			// if last key was "backspace" - remove char at previous position
			if ( this.keyInfo.assumeBackspace) {
				indexToDelete = caret-1;
				if ( newCaret > 0 ) newCaret--; // move caret to the left
			}

			// if last key was "delete" - remove char at current position
			else if (this.keyInfo.assumeDel) {
				indexToDelete = caret;
			}

			result = ValueFormatter.cutOneChar( result, indexToDelete );
			return {
				value: result, 
				caret: newCaret
			};
		},

		/* 
		*	Move caret to the given position. 
		*/
		setCaret( idx ) {
			this.caret = idx < 0 ? 0 : idx;
			this.$refs.domInput.setSelectionRange( this.caret, this.caret );
		},

		/*
		* Return current caret position
		*/
		currentCaret() {
			return this.$refs.domInput.selectionStart;
		}

	}
});