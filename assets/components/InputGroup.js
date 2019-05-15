/*
* Pass to this component a property value with object {values: Array} and it will show auto-resizable text edits
* with special formatting for every 
*/

Vue.component( "input-group", {
	props: ["value"],
	template:
`
<div>
 	<div class="hugh-row" 
 		:class="{'hugh-row-item' : i < arr.length-1, 'hugh-row-item--last': i==arr.length-1 }" 
 		v-for="(item,i) in arr" :key="i">
 		<div>
			<img 
				class="hugh-img"
				:class="{'hugh-img--selected': item.selected}" 
				src="assets/img/hugh.png">
		</div>
		<div>
			<div class="hugh-title" :class="{'hugh-title--selected': item.selected}">
				<strong>HUGH IS</strong>
			</div>
			<div class="hugh-input">
				<auto-formatting-text-editor 
					@input="onInput" 
					:value="item.value" 
					:id="i"
					@editorActive="editorActive"
					:borderClass="item.selected ? 'text-input--selected' : ''">
				</auto-formatting-text-editor>
				<span class="hugh-input-hours">hours old</span>
			</div>
		</div>
	</div>
</div>
`,
	data () {
		
		return {
			arr: (this.value && Array.isArray(this.value) ) ? this.value  : [{value: "", selected: false}] // get array from props if any
		}
	},
	methods: {

		onInput( editedItem ) {

			if ( editedItem )
				Vue.set( this.arr, editedItem.id, {
						value: editedItem.value, 
						selected: this.arr[editedItem.id].selected
					});

			this.$emit("input", this.arr); // send back to parent
		},
		editorActive(editorID) {
			this.arr.forEach( (item, idx) => { item.selected=(idx == editorID) } );
		}
	}

});
