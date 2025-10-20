import { OrderFormValues } from "@/app/(landings)/booking/new/schema";

export function calculateServicesPrice(orderData: Partial<OrderFormValues>) {
  let servicesPrice = 0;
  const specificType = orderData.specificServiceType;

  // Set base price based on specific type
  servicesPrice += specificType?.basePrice || 0;
  // Add price adjustments based on property details
  if (orderData.bedrooms) {
    servicesPrice += calculateBedroomsPrice(orderData.bedrooms);
  }

  if (orderData.bathrooms) {
    servicesPrice += calculateBathroomsPrice(orderData.bathrooms);
  }

  return servicesPrice;
}

export function calculateBedroomsPrice(bedrooms: string) {
  const bedroomCount = bedrooms === "4+" ? 4 : parseInt(bedrooms);
  if (bedroomCount > 1) {
    return (bedroomCount - 1) * 20;
  }
  return 0;
}

export function calculateBathroomsPrice(bathrooms: string) {
  const bathroomCount = bathrooms === "4+" ? 4 : parseInt(bathrooms);
  if (bathroomCount > 1) {
    return (bathroomCount - 1) * 25;
  }
  return 0;
}

export function calculateAddOnsPrice(orderData: Partial<OrderFormValues>) {
  let addOnsPrice = 0;

  // Add prices for selected add-ons
  if (orderData.addOns && orderData.addOns.length > 0) {
    orderData.addOns.forEach((addon) => {
      // const addon = addOnOptions.find((a) => a.id === addonId);
      if (addon) {
        addOnsPrice += addon.price;
      }
    });
  }

  // Add pricing based on square footage
  if (orderData.squareFootage) {
    const footage = orderData.squareFootage;

    addOnsPrice += calculateSquareFootage(footage);
  }
  return addOnsPrice;
}

export function calculateSquareFootage(footage: string | number) {
  // Validate numeric input
  if (typeof footage === "number") {
    if (footage <= 0 || isNaN(footage)) {
      return 0;
    }
    if (footage >= 2500) {
      footage = "2500+";
    } else if (footage >= 2000) {
      footage = "2000";
    } else if (footage >= 1500) {
      footage = "1500";
    } else if (footage >= 1000) {
      footage = "1000";
    } else {
      return 0;
    }
  }

  // Validate string input
  const validStrings = ["1000", "1500", "2000", "2500+"];
  if (typeof footage === "string" && !validStrings.includes(footage)) {
    return 0;
  }

  let price = 0;
  // Add additional charges based on square footage tiers
  if (footage === "1000") {
    price = 15; // Small additional charge for 500-1000 sq ft
  } else if (footage === "1500") {
    price = 30; // Medium additional charge for 1000-1500 sq ft
  } else if (footage === "2000") {
    price = 45; // Larger charge for 1500-2000 sq ft
  } else if (footage === "2500+") {
    price = 60; // Largest charge for 2500+ sq ft
  }
  return price;
}

export function calculateBasePrice(
  orderData: Partial<OrderFormValues>
): number {
  let basePrice = 0;

  basePrice += calculateServicesPrice(orderData);

  basePrice += calculateAddOnsPrice(orderData);

  return basePrice;
}

export function calculateTotal(orderData: Partial<OrderFormValues>): number {
  const basePrice = calculateBasePrice(orderData);
  const tipAmount = orderData.tipAmount || 0;

  return basePrice + tipAmount;
}

// Calculate discount based on frequency
export const getDiscountPercentage = (frequency: string | null): number => {
  switch (frequency) {
    case "MONTHLY":
      return 0.1; // 10%
    case "BIWEEKLY":
      return 0.15; // 15%
    case "WEEKLY":
      return 0.1; // 10%
    default:
      return 0; // No discount
  }
};
