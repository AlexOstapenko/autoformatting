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
		<li v-for="item in items">{{item}}</li>
	</ol>

</div>
`,
	data: {
		items: ["111222333", "1000000"]
	},
	methods: {
		deleteLastInput() {
			if ( this.items.length > 1 )
				this.items.pop();
			else {
				Vue.set( this.items, 0, "" );
			}
		},

		addNewInput() {
			this.items.push("");
		}
	}
} );
