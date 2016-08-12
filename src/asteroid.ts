export class Asteroid extends Phaser.Sprite{

    public static ASTEROID_TINY : number = 0;
    public static ASTEROID_SMALL : number = 1;
    public static ASTEROID_MEDIUM : number = 2;
    public static ASTEROID_LARGE : number = 3;

    private _size : number;

    set size(s : number) {
        this._size = s;
    }

    get size(): number {
        return this._size;
    }

}