import { Textarea } from '@/components/ui/Textarea';
import { useFormContext } from 'react-hook-form';
import { OrderFormValues } from '../../schema';
import { petTypeOptions } from '../../formData';
import { cn } from '@/lib/utils';

export default function PetInfoStep() {
  const {
    register,
    watch,
    setValue,
    formState: { errors }
  } = useFormContext<OrderFormValues>();
  
  const selectedPetType = watch('petType');
  const showPetInstructions = selectedPetType && selectedPetType !== 'no-pets';
  
  return (
    <>
      <h3 className="text-heading-4">Pet Information</h3>
      <p className="text-surface-500 mb-4">Let us know if you have pets so our cleaners can be prepared.</p>

      <div className='flex flex-col gap-2 text-caption'>
        {petTypeOptions.map((option) => (
          <button
            key={option.id}
            type='button'
            onClick={() => setValue('petType', option.id, { shouldValidate: true })}
            className={cn(
              'py-1 px-2 rounded text-start cursor-pointer',
              selectedPetType === option.id 
                ? 'bg-primary-700 text-white border-primary-700' 
                : 'border-black/10 hover:border-primary-700/50'
            )}
          >
            {option.name}
          </button>
        ))}
      </div>
      
      {/* Hidden field for form validation */}
      <input type="hidden" {...register('petType')} />

      {showPetInstructions && (
        <div className="mt-6">
          <Textarea
            label='Special instructions for pets'
            placeholder='e.g., keep bedroom door closed, cat is nervous around strangers'
            {...register('petInstructions')}
            rows={2}
          />
          {errors.petInstructions && (
            <p className="text-xs text-error mt-1">{errors.petInstructions.message as string}</p>
          )}
        </div>
      )}
    </>
  );
}
