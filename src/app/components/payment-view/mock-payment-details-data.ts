import { IPaymentDetails } from '../../interfaces/IPaymentDetails';

export const PAYMENTDETAILS: IPaymentDetails[] = [
    {
        'payment': {
            'paymentReference': 'RC-2332-5352-6211-7352',
            'dateCreated': '28 Jun 2018—12:30:15',
            'paymentMethod': 'card',
            'paymentAmount': '£215',
            'status': 'success'
        },
        'fees': {
            'feeCode': 'FEE0334',
            'feeAmount': '£215',
            'netAmount': '£215',
            'description': 'Application for probate'

        },
        'cardDetails': {
            'type': 'visa',
            'name': 'Jane Hartley',
            'cardNumber': '**** **** **** 2346',
            'cardExpiry': '12/20'
        },
        'paymentHistories': [{
                'paymentStatus': 'pending',
                'paymentAmount': '£215',
                'dateCreated': '28 Jun 2018—12:27:15'
            },
            {
                'paymentStatus': 'failed',
                'paymentAmount': '£215',
                'dateCreated': '28 Jun 2018—10:27:15'
            }],
        'caseNumber': '2309-1129-5569-2669'
    },
    {
        'payment': {
            'paymentReference': 'RC-1313-5251-7432-6214',
            'dateCreated': '28 Jun 2018—12:30:15',
            'paymentMethod': 'card',
            'paymentAmount': '£215',
            'status': 'success'
        },
        'fees': {
            'feeCode': 'FEE0334',
            'feeAmount': '£215',
            'netAmount': '£215',
            'description': 'Application for probate'

        },
        'cardDetails': {
            'type': 'visa',
            'name': 'Jane Hartley',
            'cardNumber': '**** **** **** 2346',
            'cardExpiry': '12/20'
        },
        'paymentHistories': [{
            'paymentStatus': 'pending',
            'paymentAmount': '£215',
            'dateCreated': '28 Jun 2018—12:27:15'
        },
            {
                'paymentStatus': 'failed',
                'paymentAmount': '£215',
                'dateCreated': '28 Jun 2018—10:27:15'
            }],
        'caseNumber': '2309-1129-5569-2669'
    },
    {
        'payment': {
            'paymentReference': 'RC-1521-1095-0964-3143',
            'dateCreated': '28 Jun 2018—12:30:15',
            'paymentMethod': 'card',
            'paymentAmount': '£215',
            'status': 'success'
        },
        'fees': {
            'feeCode': 'FEE0334',
            'feeAmount': '£215',
            'netAmount': '£215',
            'description': 'Application for probate'

        },
        'cardDetails': {
            'type': 'visa',
            'name': 'Jane Hartley',
            'cardNumber': '**** **** **** 2346',
            'cardExpiry': '12/20'
        },
        'paymentHistories': [{
            'paymentStatus': 'pending',
            'paymentAmount': '£215',
            'dateCreated': '28 Jun 2018—12:27:15'
        },
            {
                'paymentStatus': 'failed',
                'paymentAmount': '£215',
                'dateCreated': '28 Jun 2018—10:27:15'
            }],
        'caseNumber': '2309-1129-5569-2669'
    }
];
