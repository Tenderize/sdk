import { parseEther, formatEther } from 'viem'

export const formatAmount = (amount: bigint | number | string) => {
    if (typeof amount === 'number') amount = parseEther(amount.toFixed(18).toString());
    if (typeof amount === 'string') amount = BigInt(amount);
    const floatString = formatEther(amount);
    return floatString > '1'
        ? formatFloatstring(floatString, 3)
        : formatFloatstring(floatString, 6);
};

export const formatFloatstring = (
    floatString: string,
    maxDecimals: number
): string => {
    if (floatString === '0') return '0';
    // Ensure leading zeros are removed except for numbers less than 1
    floatString = floatString.replace(/^0+/, '');
    if (floatString.startsWith('.')) floatString = '0' + floatString;

    let [integerPart, decimalPart = ''] = floatString.split('.');
    const integerLength = integerPart.length;

    let suffix = '';
    if (integerLength > 6) {
        // Format as millions
        suffix = 'M';
        const millions = integerPart.substring(0, integerLength - 6);
        integerPart = millions;
        decimalPart = floatString.substring(
            integerLength - 6,
            integerLength - 6 + maxDecimals
        );
    } else if (integerLength > 3) {
        // For thousands, add two decimals if there are decimal parts
        decimalPart = decimalPart.substring(0, 2); // Keep up to two decimal places for thousands
    } else {
        // For numbers less than 1000, keep the specified max decimals
        decimalPart = decimalPart.substring(0, maxDecimals);
    }

    // Format the integer part with commas
    const formattedInteger = integerPart.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

    // Combine the integer and decimal parts
    let formatted =
        decimalPart.length > 0
            ? `${formattedInteger}.${decimalPart}`
            : formattedInteger;

    if (suffix === 'M') {
        // For millions, ensure we remove any trailing zeros after the decimal point
        formatted = formatted.replace(/(\.\d*?[1-9])0+$/, '$1').replace(/\.$/, '');
    }

    return formatted + suffix;
};