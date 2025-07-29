import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { useFormContext } from 'react-hook-form';
import { OrderFormValues } from '../../schema';
import { cn } from '@/lib/utils';

export default function TipStep({totalPrice}: {totalPrice: number}) {
  const {
    setValue,
    watch,
    formState: { errors }
  } = useFormContext<OrderFormValues>();
  
  const basePrice = totalPrice; // Example base price - should be dynamically calculated
  const tipAmount = watch('tipAmount') || 0;
  const tipPercentage = watch('tipPercentage') || 0;
  
  // Pre-defined tip percentages with dynamically calculated amounts
  const tipOptions = [
    { percentage: 0, sublabel: "(0%)" },
    { percentage: 10, sublabel: "(10%)" },
    { percentage: 15, sublabel: "(15%)" },
    { percentage: 20, sublabel: "(20%)" },
  ];
  
  const handleTipSelect = (percentage: number) => {
    // Calculate tip amount based on percentage
    const amount = Math.ceil((percentage / 100) * basePrice);
    setValue('tipPercentage', percentage, { shouldValidate: true });
    setValue('tipAmount', amount, { shouldValidate: true });
  };
  
  
  const handleCustomTipChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value) || 0;
    setValue('tipAmount', value, { shouldValidate: true });
    // Calculate and set the corresponding percentage
    if (basePrice > 0) {
      const percentage = Math.ceil((value / basePrice) * 100);
      // alert(JSON.stringify({tipPercentage, percentage}))
      setValue('tipPercentage', percentage, { shouldValidate: true });
    }
  };

  return (
    <>
      <div className='space-y-2'>
        <h3 className="text-heading-4">Add a Tip (Optional)</h3>
        <p className="text-surface-500">100% of your tip goes directly to your cleaner</p>
      </div>
      
      <div className='flex gap-4 w-full overflow-x-scroll max-w-full no-scrollbar'>
        {tipOptions.map((option) => (
          <Button
            key={option.percentage}
            type='button'
            className={cn('text-sm whitespace-nowrap', tipPercentage === option.percentage && "bg-primary-700 text-white hover:bg-primary-700")}
            size="2xs"
            variant={"default-outline"}
            onClick={() => handleTipSelect(option.percentage)}
          >
            ${Math.ceil((option.percentage / 100) * basePrice)}
            <span className={cn('text-tiny ml-1.5', tipPercentage !== option.percentage ? "opacity-50" : "opacity-85")}>{option.sublabel}</span>
          </Button>
        ))}
      </div>
      
        <Input
          label='Custom tip amount'
          type="number"
          min="0"
          step="1"
          value={tipAmount}
          onChange={handleCustomTipChange}
          error={errors.tipAmount?.message as string}
          labelClassName="font-medium text-base mt-4"
          placeholder="Enter custom amount"
        />
    </>
  );
}
