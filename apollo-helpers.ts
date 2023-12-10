import { FieldPolicy, FieldReadFunction, TypePolicies, TypePolicy } from '@apollo/client/cache';
export type AffectedRowsOutputKeySpecifier = ('count' | AffectedRowsOutputKeySpecifier)[];
export type AffectedRowsOutputFieldPolicy = {
	count?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateAttestationKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateAttestationKeySpecifier)[];
export type AggregateAttestationFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateEnsNameKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateEnsNameKeySpecifier)[];
export type AggregateEnsNameFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateOffchainRevocationKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateOffchainRevocationKeySpecifier)[];
export type AggregateOffchainRevocationFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateSchemaKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateSchemaKeySpecifier)[];
export type AggregateSchemaFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateSchemaNameKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateSchemaNameKeySpecifier)[];
export type AggregateSchemaNameFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateServiceStatKeySpecifier = ('_count' | '_max' | '_min' | AggregateServiceStatKeySpecifier)[];
export type AggregateServiceStatFieldPolicy = {
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AggregateTimestampKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | AggregateTimestampKeySpecifier)[];
export type AggregateTimestampFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationKeySpecifier = ('attester' | 'data' | 'decodedDataJson' | 'expirationTime' | 'id' | 'ipfsHash' | 'isOffchain' | 'recipient' | 'refUID' | 'revocable' | 'revocationTime' | 'revoked' | 'schema' | 'schemaId' | 'time' | 'timeCreated' | 'txid' | AttestationKeySpecifier)[];
export type AttestationFieldPolicy = {
	attester?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	decodedDataJson?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ipfsHash?: FieldPolicy<any> | FieldReadFunction<any>,
	isOffchain?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	refUID?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationAvgAggregateKeySpecifier = ('expirationTime' | 'revocationTime' | 'time' | 'timeCreated' | AttestationAvgAggregateKeySpecifier)[];
export type AttestationAvgAggregateFieldPolicy = {
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationCountAggregateKeySpecifier = ('_all' | 'attester' | 'data' | 'decodedDataJson' | 'expirationTime' | 'id' | 'ipfsHash' | 'isOffchain' | 'recipient' | 'refUID' | 'revocable' | 'revocationTime' | 'revoked' | 'schemaId' | 'time' | 'timeCreated' | 'txid' | AttestationCountAggregateKeySpecifier)[];
export type AttestationCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	attester?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	decodedDataJson?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ipfsHash?: FieldPolicy<any> | FieldReadFunction<any>,
	isOffchain?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	refUID?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'attester' | 'data' | 'decodedDataJson' | 'expirationTime' | 'id' | 'ipfsHash' | 'isOffchain' | 'recipient' | 'refUID' | 'revocable' | 'revocationTime' | 'revoked' | 'schemaId' | 'time' | 'timeCreated' | 'txid' | AttestationGroupByKeySpecifier)[];
export type AttestationGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	attester?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	decodedDataJson?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ipfsHash?: FieldPolicy<any> | FieldReadFunction<any>,
	isOffchain?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	refUID?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationMaxAggregateKeySpecifier = ('attester' | 'data' | 'decodedDataJson' | 'expirationTime' | 'id' | 'ipfsHash' | 'isOffchain' | 'recipient' | 'refUID' | 'revocable' | 'revocationTime' | 'revoked' | 'schemaId' | 'time' | 'timeCreated' | 'txid' | AttestationMaxAggregateKeySpecifier)[];
export type AttestationMaxAggregateFieldPolicy = {
	attester?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	decodedDataJson?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ipfsHash?: FieldPolicy<any> | FieldReadFunction<any>,
	isOffchain?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	refUID?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationMinAggregateKeySpecifier = ('attester' | 'data' | 'decodedDataJson' | 'expirationTime' | 'id' | 'ipfsHash' | 'isOffchain' | 'recipient' | 'refUID' | 'revocable' | 'revocationTime' | 'revoked' | 'schemaId' | 'time' | 'timeCreated' | 'txid' | AttestationMinAggregateKeySpecifier)[];
export type AttestationMinAggregateFieldPolicy = {
	attester?: FieldPolicy<any> | FieldReadFunction<any>,
	data?: FieldPolicy<any> | FieldReadFunction<any>,
	decodedDataJson?: FieldPolicy<any> | FieldReadFunction<any>,
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	ipfsHash?: FieldPolicy<any> | FieldReadFunction<any>,
	isOffchain?: FieldPolicy<any> | FieldReadFunction<any>,
	recipient?: FieldPolicy<any> | FieldReadFunction<any>,
	refUID?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revoked?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type AttestationSumAggregateKeySpecifier = ('expirationTime' | 'revocationTime' | 'time' | 'timeCreated' | AttestationSumAggregateKeySpecifier)[];
export type AttestationSumAggregateFieldPolicy = {
	expirationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	revocationTime?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	timeCreated?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameKeySpecifier = ('id' | 'name' | 'timestamp' | EnsNameKeySpecifier)[];
export type EnsNameFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameAvgAggregateKeySpecifier = ('timestamp' | EnsNameAvgAggregateKeySpecifier)[];
export type EnsNameAvgAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameCountAggregateKeySpecifier = ('_all' | 'id' | 'name' | 'timestamp' | EnsNameCountAggregateKeySpecifier)[];
export type EnsNameCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'id' | 'name' | 'timestamp' | EnsNameGroupByKeySpecifier)[];
export type EnsNameGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameMaxAggregateKeySpecifier = ('id' | 'name' | 'timestamp' | EnsNameMaxAggregateKeySpecifier)[];
export type EnsNameMaxAggregateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameMinAggregateKeySpecifier = ('id' | 'name' | 'timestamp' | EnsNameMinAggregateKeySpecifier)[];
export type EnsNameMinAggregateFieldPolicy = {
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type EnsNameSumAggregateKeySpecifier = ('timestamp' | EnsNameSumAggregateKeySpecifier)[];
export type EnsNameSumAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type MutationKeySpecifier = ('createManyAttestation' | 'createManyEnsName' | 'createManyOffchainRevocation' | 'createManySchema' | 'createManySchemaName' | 'createManyServiceStat' | 'createManyTimestamp' | 'createOneAttestation' | 'createOneEnsName' | 'createOneOffchainRevocation' | 'createOneSchema' | 'createOneSchemaName' | 'createOneServiceStat' | 'createOneTimestamp' | 'deleteManyAttestation' | 'deleteManyEnsName' | 'deleteManyOffchainRevocation' | 'deleteManySchema' | 'deleteManySchemaName' | 'deleteManyServiceStat' | 'deleteManyTimestamp' | 'deleteOneAttestation' | 'deleteOneEnsName' | 'deleteOneOffchainRevocation' | 'deleteOneSchema' | 'deleteOneSchemaName' | 'deleteOneServiceStat' | 'deleteOneTimestamp' | 'updateManyAttestation' | 'updateManyEnsName' | 'updateManyOffchainRevocation' | 'updateManySchema' | 'updateManySchemaName' | 'updateManyServiceStat' | 'updateManyTimestamp' | 'updateOneAttestation' | 'updateOneEnsName' | 'updateOneOffchainRevocation' | 'updateOneSchema' | 'updateOneSchemaName' | 'updateOneServiceStat' | 'updateOneTimestamp' | 'upsertOneAttestation' | 'upsertOneEnsName' | 'upsertOneOffchainRevocation' | 'upsertOneSchema' | 'upsertOneSchemaName' | 'upsertOneServiceStat' | 'upsertOneTimestamp' | MutationKeySpecifier)[];
export type MutationFieldPolicy = {
	createManyAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	createManyEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	createManyOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	createManySchema?: FieldPolicy<any> | FieldReadFunction<any>,
	createManySchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	createManyServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	createManyTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	createOneTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManyAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManyEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManyOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManySchema?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManySchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManyServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteManyTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	deleteOneTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManyAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManyEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManyOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManySchema?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManySchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManyServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	updateManyTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	updateOneTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	upsertOneTimestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationKeySpecifier = ('from' | 'id' | 'timestamp' | 'txid' | 'uid' | OffchainRevocationKeySpecifier)[];
export type OffchainRevocationFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationAvgAggregateKeySpecifier = ('timestamp' | OffchainRevocationAvgAggregateKeySpecifier)[];
export type OffchainRevocationAvgAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationCountAggregateKeySpecifier = ('_all' | 'from' | 'id' | 'timestamp' | 'txid' | 'uid' | OffchainRevocationCountAggregateKeySpecifier)[];
export type OffchainRevocationCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'from' | 'id' | 'timestamp' | 'txid' | 'uid' | OffchainRevocationGroupByKeySpecifier)[];
export type OffchainRevocationGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationMaxAggregateKeySpecifier = ('from' | 'id' | 'timestamp' | 'txid' | 'uid' | OffchainRevocationMaxAggregateKeySpecifier)[];
export type OffchainRevocationMaxAggregateFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationMinAggregateKeySpecifier = ('from' | 'id' | 'timestamp' | 'txid' | 'uid' | OffchainRevocationMinAggregateKeySpecifier)[];
export type OffchainRevocationMinAggregateFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>,
	uid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type OffchainRevocationSumAggregateKeySpecifier = ('timestamp' | OffchainRevocationSumAggregateKeySpecifier)[];
export type OffchainRevocationSumAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type QueryKeySpecifier = ('aggregateAttestation' | 'aggregateEnsName' | 'aggregateOffchainRevocation' | 'aggregateSchema' | 'aggregateSchemaName' | 'aggregateServiceStat' | 'aggregateTimestamp' | 'attestation' | 'attestations' | 'ensName' | 'ensNames' | 'findFirstAttestation' | 'findFirstAttestationOrThrow' | 'findFirstEnsName' | 'findFirstEnsNameOrThrow' | 'findFirstOffchainRevocation' | 'findFirstOffchainRevocationOrThrow' | 'findFirstSchema' | 'findFirstSchemaName' | 'findFirstSchemaNameOrThrow' | 'findFirstSchemaOrThrow' | 'findFirstServiceStat' | 'findFirstServiceStatOrThrow' | 'findFirstTimestamp' | 'findFirstTimestampOrThrow' | 'getAttestation' | 'getEnsName' | 'getOffchainRevocation' | 'getSchema' | 'getSchemaName' | 'getServiceStat' | 'getTimestamp' | 'groupByAttestation' | 'groupByEnsName' | 'groupByOffchainRevocation' | 'groupBySchema' | 'groupBySchemaName' | 'groupByServiceStat' | 'groupByTimestamp' | 'offchainRevocation' | 'offchainRevocations' | 'schema' | 'schemaName' | 'schemaNames' | 'schemata' | 'serviceStat' | 'serviceStats' | 'timestamp' | 'timestamps' | QueryKeySpecifier)[];
export type QueryFieldPolicy = {
	aggregateAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	aggregateTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	attestation?: FieldPolicy<any> | FieldReadFunction<any>,
	attestations?: FieldPolicy<any> | FieldReadFunction<any>,
	ensName?: FieldPolicy<any> | FieldReadFunction<any>,
	ensNames?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstAttestationOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstEnsNameOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstOffchainRevocationOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstSchemaNameOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstSchemaOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstServiceStatOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	findFirstTimestampOrThrow?: FieldPolicy<any> | FieldReadFunction<any>,
	getAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	getEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	getOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	getSchema?: FieldPolicy<any> | FieldReadFunction<any>,
	getSchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	getServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	getTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	groupByAttestation?: FieldPolicy<any> | FieldReadFunction<any>,
	groupByEnsName?: FieldPolicy<any> | FieldReadFunction<any>,
	groupByOffchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	groupBySchema?: FieldPolicy<any> | FieldReadFunction<any>,
	groupBySchemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	groupByServiceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	groupByTimestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	offchainRevocation?: FieldPolicy<any> | FieldReadFunction<any>,
	offchainRevocations?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaName?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaNames?: FieldPolicy<any> | FieldReadFunction<any>,
	schemata?: FieldPolicy<any> | FieldReadFunction<any>,
	serviceStat?: FieldPolicy<any> | FieldReadFunction<any>,
	serviceStats?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamps?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaKeySpecifier = ('_count' | 'attestations' | 'creator' | 'id' | 'index' | 'resolver' | 'revocable' | 'schema' | 'schemaNames' | 'time' | 'txid' | SchemaKeySpecifier)[];
export type SchemaFieldPolicy = {
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	attestations?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	resolver?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaNames?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaAvgAggregateKeySpecifier = ('time' | SchemaAvgAggregateKeySpecifier)[];
export type SchemaAvgAggregateFieldPolicy = {
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaCountKeySpecifier = ('attestations' | 'schemaNames' | SchemaCountKeySpecifier)[];
export type SchemaCountFieldPolicy = {
	attestations?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaNames?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaCountAggregateKeySpecifier = ('_all' | 'creator' | 'id' | 'index' | 'resolver' | 'revocable' | 'schema' | 'time' | 'txid' | SchemaCountAggregateKeySpecifier)[];
export type SchemaCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	resolver?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'creator' | 'id' | 'index' | 'resolver' | 'revocable' | 'schema' | 'time' | 'txid' | SchemaGroupByKeySpecifier)[];
export type SchemaGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	resolver?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaMaxAggregateKeySpecifier = ('creator' | 'id' | 'index' | 'resolver' | 'revocable' | 'schema' | 'time' | 'txid' | SchemaMaxAggregateKeySpecifier)[];
export type SchemaMaxAggregateFieldPolicy = {
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	resolver?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaMinAggregateKeySpecifier = ('creator' | 'id' | 'index' | 'resolver' | 'revocable' | 'schema' | 'time' | 'txid' | SchemaMinAggregateKeySpecifier)[];
export type SchemaMinAggregateFieldPolicy = {
	creator?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	index?: FieldPolicy<any> | FieldReadFunction<any>,
	resolver?: FieldPolicy<any> | FieldReadFunction<any>,
	revocable?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameKeySpecifier = ('attesterAddress' | 'id' | 'isCreator' | 'name' | 'schema' | 'schemaId' | 'time' | SchemaNameKeySpecifier)[];
export type SchemaNameFieldPolicy = {
	attesterAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	schema?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameAvgAggregateKeySpecifier = ('time' | SchemaNameAvgAggregateKeySpecifier)[];
export type SchemaNameAvgAggregateFieldPolicy = {
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameCountAggregateKeySpecifier = ('_all' | 'attesterAddress' | 'id' | 'isCreator' | 'name' | 'schemaId' | 'time' | SchemaNameCountAggregateKeySpecifier)[];
export type SchemaNameCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	attesterAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'attesterAddress' | 'id' | 'isCreator' | 'name' | 'schemaId' | 'time' | SchemaNameGroupByKeySpecifier)[];
export type SchemaNameGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	attesterAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameMaxAggregateKeySpecifier = ('attesterAddress' | 'id' | 'isCreator' | 'name' | 'schemaId' | 'time' | SchemaNameMaxAggregateKeySpecifier)[];
export type SchemaNameMaxAggregateFieldPolicy = {
	attesterAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameMinAggregateKeySpecifier = ('attesterAddress' | 'id' | 'isCreator' | 'name' | 'schemaId' | 'time' | SchemaNameMinAggregateKeySpecifier)[];
export type SchemaNameMinAggregateFieldPolicy = {
	attesterAddress?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	isCreator?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	schemaId?: FieldPolicy<any> | FieldReadFunction<any>,
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaNameSumAggregateKeySpecifier = ('time' | SchemaNameSumAggregateKeySpecifier)[];
export type SchemaNameSumAggregateFieldPolicy = {
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type SchemaSumAggregateKeySpecifier = ('time' | SchemaSumAggregateKeySpecifier)[];
export type SchemaSumAggregateFieldPolicy = {
	time?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceStatKeySpecifier = ('name' | 'value' | ServiceStatKeySpecifier)[];
export type ServiceStatFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceStatCountAggregateKeySpecifier = ('_all' | 'name' | 'value' | ServiceStatCountAggregateKeySpecifier)[];
export type ServiceStatCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceStatGroupByKeySpecifier = ('_count' | '_max' | '_min' | 'name' | 'value' | ServiceStatGroupByKeySpecifier)[];
export type ServiceStatGroupByFieldPolicy = {
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceStatMaxAggregateKeySpecifier = ('name' | 'value' | ServiceStatMaxAggregateKeySpecifier)[];
export type ServiceStatMaxAggregateFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type ServiceStatMinAggregateKeySpecifier = ('name' | 'value' | ServiceStatMinAggregateKeySpecifier)[];
export type ServiceStatMinAggregateFieldPolicy = {
	name?: FieldPolicy<any> | FieldReadFunction<any>,
	value?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampKeySpecifier = ('from' | 'id' | 'timestamp' | 'tree' | 'txid' | TimestampKeySpecifier)[];
export type TimestampFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	tree?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampAvgAggregateKeySpecifier = ('timestamp' | TimestampAvgAggregateKeySpecifier)[];
export type TimestampAvgAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampCountAggregateKeySpecifier = ('_all' | 'from' | 'id' | 'timestamp' | 'tree' | 'txid' | TimestampCountAggregateKeySpecifier)[];
export type TimestampCountAggregateFieldPolicy = {
	_all?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	tree?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampGroupByKeySpecifier = ('_avg' | '_count' | '_max' | '_min' | '_sum' | 'from' | 'id' | 'timestamp' | 'tree' | 'txid' | TimestampGroupByKeySpecifier)[];
export type TimestampGroupByFieldPolicy = {
	_avg?: FieldPolicy<any> | FieldReadFunction<any>,
	_count?: FieldPolicy<any> | FieldReadFunction<any>,
	_max?: FieldPolicy<any> | FieldReadFunction<any>,
	_min?: FieldPolicy<any> | FieldReadFunction<any>,
	_sum?: FieldPolicy<any> | FieldReadFunction<any>,
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	tree?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampMaxAggregateKeySpecifier = ('from' | 'id' | 'timestamp' | 'tree' | 'txid' | TimestampMaxAggregateKeySpecifier)[];
export type TimestampMaxAggregateFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	tree?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampMinAggregateKeySpecifier = ('from' | 'id' | 'timestamp' | 'tree' | 'txid' | TimestampMinAggregateKeySpecifier)[];
export type TimestampMinAggregateFieldPolicy = {
	from?: FieldPolicy<any> | FieldReadFunction<any>,
	id?: FieldPolicy<any> | FieldReadFunction<any>,
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>,
	tree?: FieldPolicy<any> | FieldReadFunction<any>,
	txid?: FieldPolicy<any> | FieldReadFunction<any>
};
export type TimestampSumAggregateKeySpecifier = ('timestamp' | TimestampSumAggregateKeySpecifier)[];
export type TimestampSumAggregateFieldPolicy = {
	timestamp?: FieldPolicy<any> | FieldReadFunction<any>
};
export type StrictTypedTypePolicies = {
	AffectedRowsOutput?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AffectedRowsOutputKeySpecifier | (() => undefined | AffectedRowsOutputKeySpecifier),
		fields?: AffectedRowsOutputFieldPolicy,
	},
	AggregateAttestation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateAttestationKeySpecifier | (() => undefined | AggregateAttestationKeySpecifier),
		fields?: AggregateAttestationFieldPolicy,
	},
	AggregateEnsName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateEnsNameKeySpecifier | (() => undefined | AggregateEnsNameKeySpecifier),
		fields?: AggregateEnsNameFieldPolicy,
	},
	AggregateOffchainRevocation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateOffchainRevocationKeySpecifier | (() => undefined | AggregateOffchainRevocationKeySpecifier),
		fields?: AggregateOffchainRevocationFieldPolicy,
	},
	AggregateSchema?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateSchemaKeySpecifier | (() => undefined | AggregateSchemaKeySpecifier),
		fields?: AggregateSchemaFieldPolicy,
	},
	AggregateSchemaName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateSchemaNameKeySpecifier | (() => undefined | AggregateSchemaNameKeySpecifier),
		fields?: AggregateSchemaNameFieldPolicy,
	},
	AggregateServiceStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateServiceStatKeySpecifier | (() => undefined | AggregateServiceStatKeySpecifier),
		fields?: AggregateServiceStatFieldPolicy,
	},
	AggregateTimestamp?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AggregateTimestampKeySpecifier | (() => undefined | AggregateTimestampKeySpecifier),
		fields?: AggregateTimestampFieldPolicy,
	},
	Attestation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationKeySpecifier | (() => undefined | AttestationKeySpecifier),
		fields?: AttestationFieldPolicy,
	},
	AttestationAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationAvgAggregateKeySpecifier | (() => undefined | AttestationAvgAggregateKeySpecifier),
		fields?: AttestationAvgAggregateFieldPolicy,
	},
	AttestationCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationCountAggregateKeySpecifier | (() => undefined | AttestationCountAggregateKeySpecifier),
		fields?: AttestationCountAggregateFieldPolicy,
	},
	AttestationGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationGroupByKeySpecifier | (() => undefined | AttestationGroupByKeySpecifier),
		fields?: AttestationGroupByFieldPolicy,
	},
	AttestationMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationMaxAggregateKeySpecifier | (() => undefined | AttestationMaxAggregateKeySpecifier),
		fields?: AttestationMaxAggregateFieldPolicy,
	},
	AttestationMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationMinAggregateKeySpecifier | (() => undefined | AttestationMinAggregateKeySpecifier),
		fields?: AttestationMinAggregateFieldPolicy,
	},
	AttestationSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | AttestationSumAggregateKeySpecifier | (() => undefined | AttestationSumAggregateKeySpecifier),
		fields?: AttestationSumAggregateFieldPolicy,
	},
	EnsName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameKeySpecifier | (() => undefined | EnsNameKeySpecifier),
		fields?: EnsNameFieldPolicy,
	},
	EnsNameAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameAvgAggregateKeySpecifier | (() => undefined | EnsNameAvgAggregateKeySpecifier),
		fields?: EnsNameAvgAggregateFieldPolicy,
	},
	EnsNameCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameCountAggregateKeySpecifier | (() => undefined | EnsNameCountAggregateKeySpecifier),
		fields?: EnsNameCountAggregateFieldPolicy,
	},
	EnsNameGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameGroupByKeySpecifier | (() => undefined | EnsNameGroupByKeySpecifier),
		fields?: EnsNameGroupByFieldPolicy,
	},
	EnsNameMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameMaxAggregateKeySpecifier | (() => undefined | EnsNameMaxAggregateKeySpecifier),
		fields?: EnsNameMaxAggregateFieldPolicy,
	},
	EnsNameMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameMinAggregateKeySpecifier | (() => undefined | EnsNameMinAggregateKeySpecifier),
		fields?: EnsNameMinAggregateFieldPolicy,
	},
	EnsNameSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | EnsNameSumAggregateKeySpecifier | (() => undefined | EnsNameSumAggregateKeySpecifier),
		fields?: EnsNameSumAggregateFieldPolicy,
	},
	Mutation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | MutationKeySpecifier | (() => undefined | MutationKeySpecifier),
		fields?: MutationFieldPolicy,
	},
	OffchainRevocation?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationKeySpecifier | (() => undefined | OffchainRevocationKeySpecifier),
		fields?: OffchainRevocationFieldPolicy,
	},
	OffchainRevocationAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationAvgAggregateKeySpecifier | (() => undefined | OffchainRevocationAvgAggregateKeySpecifier),
		fields?: OffchainRevocationAvgAggregateFieldPolicy,
	},
	OffchainRevocationCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationCountAggregateKeySpecifier | (() => undefined | OffchainRevocationCountAggregateKeySpecifier),
		fields?: OffchainRevocationCountAggregateFieldPolicy,
	},
	OffchainRevocationGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationGroupByKeySpecifier | (() => undefined | OffchainRevocationGroupByKeySpecifier),
		fields?: OffchainRevocationGroupByFieldPolicy,
	},
	OffchainRevocationMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationMaxAggregateKeySpecifier | (() => undefined | OffchainRevocationMaxAggregateKeySpecifier),
		fields?: OffchainRevocationMaxAggregateFieldPolicy,
	},
	OffchainRevocationMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationMinAggregateKeySpecifier | (() => undefined | OffchainRevocationMinAggregateKeySpecifier),
		fields?: OffchainRevocationMinAggregateFieldPolicy,
	},
	OffchainRevocationSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | OffchainRevocationSumAggregateKeySpecifier | (() => undefined | OffchainRevocationSumAggregateKeySpecifier),
		fields?: OffchainRevocationSumAggregateFieldPolicy,
	},
	Query?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | QueryKeySpecifier | (() => undefined | QueryKeySpecifier),
		fields?: QueryFieldPolicy,
	},
	Schema?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaKeySpecifier | (() => undefined | SchemaKeySpecifier),
		fields?: SchemaFieldPolicy,
	},
	SchemaAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaAvgAggregateKeySpecifier | (() => undefined | SchemaAvgAggregateKeySpecifier),
		fields?: SchemaAvgAggregateFieldPolicy,
	},
	SchemaCount?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaCountKeySpecifier | (() => undefined | SchemaCountKeySpecifier),
		fields?: SchemaCountFieldPolicy,
	},
	SchemaCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaCountAggregateKeySpecifier | (() => undefined | SchemaCountAggregateKeySpecifier),
		fields?: SchemaCountAggregateFieldPolicy,
	},
	SchemaGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaGroupByKeySpecifier | (() => undefined | SchemaGroupByKeySpecifier),
		fields?: SchemaGroupByFieldPolicy,
	},
	SchemaMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaMaxAggregateKeySpecifier | (() => undefined | SchemaMaxAggregateKeySpecifier),
		fields?: SchemaMaxAggregateFieldPolicy,
	},
	SchemaMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaMinAggregateKeySpecifier | (() => undefined | SchemaMinAggregateKeySpecifier),
		fields?: SchemaMinAggregateFieldPolicy,
	},
	SchemaName?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameKeySpecifier | (() => undefined | SchemaNameKeySpecifier),
		fields?: SchemaNameFieldPolicy,
	},
	SchemaNameAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameAvgAggregateKeySpecifier | (() => undefined | SchemaNameAvgAggregateKeySpecifier),
		fields?: SchemaNameAvgAggregateFieldPolicy,
	},
	SchemaNameCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameCountAggregateKeySpecifier | (() => undefined | SchemaNameCountAggregateKeySpecifier),
		fields?: SchemaNameCountAggregateFieldPolicy,
	},
	SchemaNameGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameGroupByKeySpecifier | (() => undefined | SchemaNameGroupByKeySpecifier),
		fields?: SchemaNameGroupByFieldPolicy,
	},
	SchemaNameMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameMaxAggregateKeySpecifier | (() => undefined | SchemaNameMaxAggregateKeySpecifier),
		fields?: SchemaNameMaxAggregateFieldPolicy,
	},
	SchemaNameMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameMinAggregateKeySpecifier | (() => undefined | SchemaNameMinAggregateKeySpecifier),
		fields?: SchemaNameMinAggregateFieldPolicy,
	},
	SchemaNameSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaNameSumAggregateKeySpecifier | (() => undefined | SchemaNameSumAggregateKeySpecifier),
		fields?: SchemaNameSumAggregateFieldPolicy,
	},
	SchemaSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | SchemaSumAggregateKeySpecifier | (() => undefined | SchemaSumAggregateKeySpecifier),
		fields?: SchemaSumAggregateFieldPolicy,
	},
	ServiceStat?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceStatKeySpecifier | (() => undefined | ServiceStatKeySpecifier),
		fields?: ServiceStatFieldPolicy,
	},
	ServiceStatCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceStatCountAggregateKeySpecifier | (() => undefined | ServiceStatCountAggregateKeySpecifier),
		fields?: ServiceStatCountAggregateFieldPolicy,
	},
	ServiceStatGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceStatGroupByKeySpecifier | (() => undefined | ServiceStatGroupByKeySpecifier),
		fields?: ServiceStatGroupByFieldPolicy,
	},
	ServiceStatMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceStatMaxAggregateKeySpecifier | (() => undefined | ServiceStatMaxAggregateKeySpecifier),
		fields?: ServiceStatMaxAggregateFieldPolicy,
	},
	ServiceStatMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | ServiceStatMinAggregateKeySpecifier | (() => undefined | ServiceStatMinAggregateKeySpecifier),
		fields?: ServiceStatMinAggregateFieldPolicy,
	},
	Timestamp?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampKeySpecifier | (() => undefined | TimestampKeySpecifier),
		fields?: TimestampFieldPolicy,
	},
	TimestampAvgAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampAvgAggregateKeySpecifier | (() => undefined | TimestampAvgAggregateKeySpecifier),
		fields?: TimestampAvgAggregateFieldPolicy,
	},
	TimestampCountAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampCountAggregateKeySpecifier | (() => undefined | TimestampCountAggregateKeySpecifier),
		fields?: TimestampCountAggregateFieldPolicy,
	},
	TimestampGroupBy?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampGroupByKeySpecifier | (() => undefined | TimestampGroupByKeySpecifier),
		fields?: TimestampGroupByFieldPolicy,
	},
	TimestampMaxAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampMaxAggregateKeySpecifier | (() => undefined | TimestampMaxAggregateKeySpecifier),
		fields?: TimestampMaxAggregateFieldPolicy,
	},
	TimestampMinAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampMinAggregateKeySpecifier | (() => undefined | TimestampMinAggregateKeySpecifier),
		fields?: TimestampMinAggregateFieldPolicy,
	},
	TimestampSumAggregate?: Omit<TypePolicy, "fields" | "keyFields"> & {
		keyFields?: false | TimestampSumAggregateKeySpecifier | (() => undefined | TimestampSumAggregateKeySpecifier),
		fields?: TimestampSumAggregateFieldPolicy,
	}
};
export type TypedTypePolicies = StrictTypedTypePolicies & TypePolicies;