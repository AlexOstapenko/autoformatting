new Vue( {
	el: "#app", 
	template:
`
<div>
	<button class="btn" @click="addNewInput">+</button>
	<button class="btn" @click="deleteLastInput">-</button>
	<input-group v-model="items"></input-group>
	<br><hr><br>
	<b>Data, collected in "input-group":</b><br>
	<ol>
		<li v-for="item in items.values">{{item}}</li>
	</ol>

</div>
`,
	data: {
		items: {values: [""]}
	},
	methods: {
		deleteLastInput() {
			if ( this.items.values.length > 1 )
				this.items.values.pop();
			else {
				Vue.set( this.items.values, 0, "" );
			}
		},

		addNewInput() {
			this.items.values.push("");
		}
	}
} );
