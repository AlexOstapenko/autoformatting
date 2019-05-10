/*
* Define how many digits should be in one group.
* Define which separator will be inserted between groups
*/
const AutoFormattingTextEditonSettings = {
	digitsInOneGroup: 3,
	separator: " "
}

/*
* Formats a given value into groups of digits. How many digits in one group and
* which separator to use - defined in AutoFormattingTextEditonSettings class.
* E.g. If digitsInOneGroup=3, separator=" " then the string "1234"  will be formatted as -> "1 234"
*/
class ValueFormatter {

	/*
	* Remove all prohibited chars from the given string
	*/
	static fixValue( val ) {
		return val.replace( /\D*/g, "");
	}

	/*
	* Remove all "spaces" from the given string (separators, defined in the settings)
	*/
	static deleteSeparators( val ) {
		return val.split( AutoFormattingTextEditonSettings.separator ).join("");
	}

	/*
	* Formatting: make all digits into groups of <<AutoFormattingTextEditonSettings.digitsInOneGroup>>
	*/
	static format( val, maxCounter ) {
		maxCounter = maxCounter || AutoFormattingTextEditonSettings.digitsInOneGroup;
		let result = "";
		let counter = 0;

		for( let i=val.length-1; i >=0; i--) {
			if (counter == maxCounter) {
				counter = 1;
				result = AutoFormattingTextEditonSettings.separator + result;
			}
			else counter++;

			result = val[i] + result;
		}
		return result;
	}

	/*
	* Cut one char from the given index
	*/
	static cutOneChar( str, idx) {
		return idx < 0 ? str : str.slice( 0, idx) + str.slice( idx + 1 );
	}


}