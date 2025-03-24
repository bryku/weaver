let weaver = {
	toString: function(string){
		return String(string) || '';
	},
	toNumber: function(number){
		return Number(number) || 0;
	},
	toBoolean: function(boolean){
		if(boolean == true || this.caseLower(boolean) == 'true' || boolean == '1' || boolean == 1){
			return true;
		}
		return false;
	},
	extractNumber: function(number){ // 10m -> 10
		return this.toNumber(this.toString(number).replace(/[^0-9.-]/gmi,''));
	},
	formatNumber: function(number){
		number = this.toNumber(number);
		let string = number.toFixed(2);
		let groups = string.split('.');
		let result = this.reverse(
			this.splitBy(
				groups[0].split('').reverse().join(''),
				3
			).join(',')
		);
		if(groups[1] && groups[1] != '00'){
			result += '.'.concat(groups[1])
		}
		return result;
	},
	caseLower: function(string){
		return this.toString(string).toLowerCase();
	},
	caseUpper: function(string){
		return this.toString(string).toUpperCase();
	},
	caseInvert: function(string){
		string = this.toString(string);
		let result = '';
		for(let i = 0; i < string.length; i++){
			let upper = this.caseUpper(string.charAt(i));
			if(upper === string.charAt(i)){
				result += this.caseLower(string.charAt(i));
			}else{
				result += upper;
			}
		}
		return result;
	},
	caseUpperWord: function(string){
		string = this.toString(string);
		return this.caseUpper(string.charAt(0)) + string.slice(1);
	},
	caseUpperWords: function(string){
		string = this.toString(string);
		return string.split(' ').map(word => this.caseUpperWord(word)).join(' ');
	},
	splitBy: function(string, length){
		string = this.toString(string);
		length = this.toNumber(length);
		let result = [];
		for(let i = 0; i < string.length; i+=length){
			result.push(string.slice(i, i + length))
		}
		return result;
	},
	reverse: function(string){
		string = this.toString(string);
		let result = '';
		for(let i = string.length - 1; i > -1; i--){
			result+= string.charAt(i);
		}
		return result;
	},
	shuffle: function(string1, string2){
		string1 = this.toString(string1);
		string2 = this.toString(string2);
		let result = '';
		for(let i = 0; i < Math.max(string1.length, string2.length); i++){
			result+= string1.charAt(i) || '';
			result+= string2.charAt(i) || '';
		}
		return result;
	},
	randomDigit: function(length = 1, range = 10){
		length = this.toNumber(length);
		range = this.toNumber(range);
		let result = '';
		for(let i = 0; i < length; i++){
			result += Math.floor(Math.random() * range);
		}
		return result;
	},
	randomLetter: function(length = 1, alphabet = 'abcdefghijklmnopqrstuvwxyz'){
		length = this.toNumber(length);
		alphabet = this.toString(alphabet);
		let result = '';
		for(let i = 0; i < length; i++){
			result+= alphabet.charAt(this.randomDigit(1,26)) || alphabet[0];
		}
		return result;
	},
	randomPassword: function(length){
		length = this.toNumber(length);
		let half = Math.ceil(length / 2);
		return this.shuffle(
			this.randomLetter(half),
			this.randomDigit(half)
		).slice(0, length)
	},
	randomBinary: function(length){
		length = this.toNumber(length);
		let result = '';
		for(let i = 0; i < length; i++){
			result += this.randomDigit(1,2);
		}
		return result;
	},
	randomBoolean: function(){
		return this.randomDigit(1,2) == 1 ? true : false;
	},
	randomHex: function(alpha = false){
		alpha = this.toBoolean(alpha);
		return '#'
			.concat(this.randomLetter(2, '0123456789ABCDEF'))
			.concat(this.randomLetter(2, '0123456789ABCDEF'))
			.concat(this.randomLetter(2, '0123456789ABCDEF'))
			.concat(alpha ? this.randomLetter(2, '0123456789ABCDEF') : '');
	},
	randomRgb: function(){
		return 'rgb('
			.concat(this.randomDigit(1,255))
			.concat(',')
			.concat(this.randomDigit(1,255))
			.concat(',')
			.concat(this.randomDigit(1,255))
			.concat(')')
	},
	randomRgba: function(alpha = false){
		alpha = this.toBoolean(alpha);
		return 'rgba('
			.concat(this.randomDigit(1,255))
			.concat(',')
			.concat(this.randomDigit(1,255))
			.concat(',')
			.concat(this.randomDigit(1,255))
			.concat(',')
			.concat(alpha ? this.toNumber(this.randomDigit(1,100)) / 100 : '1')
			.concat(')')
	},
	randomTime12: function(seperator  = ':'){
		seperator = this.toString(seperator);
		return this.randomDigit(1, 12).padStart(2, '0')
			.concat(seperator)
			.concat(this.randomDigit(1, 60).padStart(2, '0'))
			.concat(this.randomBoolean() ? 'AM' : 'PM')
	},
	randomTime24: function(seperator = ':'){
		seperator = this.toString(seperator);
		return this.randomDigit(1, 24).padStart(2, '0')
			.concat(seperator)
			.concat(this.randomDigit(1, 60).padStart(2, '0'))
	},
	randomDate: function(seperator = '/'){
		seperator = this.toString(seperator);
		return String(new Date().getFullYear())
			.concat(seperator)
			.concat(this.randomDigit(1, 12).padStart(2, '0'))
			.concat(seperator)
			.concat(this.randomDigit(1, 12).padStart(2, '0'))
	},
};
