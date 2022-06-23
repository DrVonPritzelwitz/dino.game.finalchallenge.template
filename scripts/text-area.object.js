export class TextArea {
	context;
	fontColor;
	fontType;
	fontSize;
	x;
	y;

	constructor(fontSize, fontType, fontColor, x, y, context){
		this.fontColor = fontColor;
		this.fontSize = fontSize;
		this.fontType = fontType;
		this.x = x;
		this.y = y;
		this.context = context;
	}

	refresh(text) {
		this.context.font = `${this.fontSize}px ${this.fontType}`;
		this.context.fillStyle = this.fontColor;
		this.context.fillText(text, this.x, this.y);
	}
}
