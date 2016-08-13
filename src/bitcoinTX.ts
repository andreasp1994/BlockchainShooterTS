export interface BitcoinTX{
    op : string;
    x : Transaction;
}

interface Transaction {
    lock_time: string;
    ver : number;
    size : number;
    inputs : TXInput[];
    time: number;
    tx_index: number;
    vin_sz: number;
    hash: string;
    vout_sz: number;
    relayed_by: string;
    out : TX[]
}

interface TXInput {
    sequence : number; 
    prev_out : TX;
    script : string;
}

interface TX {  //Another name???
    spent : boolean;
    tx_index : number;
    type: number;
    addr: string;
    value: number;
    n: number;
    script: number;
}