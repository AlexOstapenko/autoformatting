/*
* Pass to this component a property value with object {values: Array} and it will show auto-resizable text edits
* with special formatting for every 
*/

Vue.component( "input-group", {
	props: ["value"],
	template:
`
<div>
	<div v-for="(str,i) in arr"  class="little-b-margin" :key="i">
		Text editor #{{i+1}}: <auto-formatting-text-editor @input="onInput" :value="str" :id="i"></auto-formatting-text-editor>
	</div>
</div>
`,
	data () {
		return {
			arr: this.value && this.value.concat([]) // get array from props if any
		}
	},
	methods: {

		onInput( editedItem ) {

			if ( editedItem )
				Vue.set( this.arr, editedItem.id , editedItem.value );

			this.$emit("input", this.arr); // send back to parent
		}
	}


});
