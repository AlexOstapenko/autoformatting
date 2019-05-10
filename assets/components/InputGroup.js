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
			arr: this.value.values.concat([]) // get array from props
		}
	},
	methods: {

		onInput( editedItem ) {

			if ( editedItem )
				Vue.set( this.arr, editedItem.id , editedItem.value );

			let values = {values: this.arr};
			this.$emit("input", values); // send back to parent
		}
	}


});