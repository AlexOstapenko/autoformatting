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
		<li v-for="item in items">{{item.value}}, selected: {{item["selected"]}}</li>
	</ol>

</div>
`,
	data: {
		items: [{value: "111111", selected: true},{value: "222222", selected: false}]
	},
	methods: {
		deleteLastInput() {
			if ( this.items.length > 1 )
				this.items.pop();
			else {
				Vue.set( this.items, 0, {value: "", selected: false} );
			}
		},

		addNewInput() {
			this.items.push({value: "", selected: false});
		}
	}
} );
