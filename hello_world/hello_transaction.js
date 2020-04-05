const {BaseTransaction, TransactionError} = require('@liskhq/lisk-transactions');

class HelloTransaction extends BaseTransaction {

	static get TYPE () {return 20;};

	static get FEE () {return `${10 ** 8}`;};

	async prepare(store) {
		await store.account.cache([
			{address: this.senderId,},
		]);
	}

	validateAsset() {
		const errors = [];
		if (!this.asset.hello || typeof this.asset.hello !== 'string' || this.asset.hello.length > 64) {
			errors.push(
				new TransactionError(
					'Invalid "asset.hello" defined on transaction',
					this.id,
					'.asset.hello',
					this.asset.hello,
					'A string value no longer than 64 characters',
				)
			);
		}
		return errors;
	}

	applyAsset(store) {
        const errors = [];
        const sender = store.account.get(this.senderId);
        const newObj = { ...sender, asset: { hello: this.asset.hello } };
        store.account.set(sender.address, newObj);
        return errors; // array of TransactionErrors, returns empty array if no errors are thrown
	}

	undoAsset(store) {
		const sender = store.account.get(this.senderId);
		const oldObj = { ...sender, asset: null };
		store.account.set(sender.address, oldObj);
		return [];
	}
}

module.exports = HelloTransaction;