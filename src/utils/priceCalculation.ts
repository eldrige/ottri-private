import { OrderFormValues } from "@/app/booking/new/schema";
import { addOnOptions, specificTypes } from "@/app/booking/new/formData";

export function calculateServicesPrice(orderData: Partial<OrderFormValues>) {
  let servicesPrice = 0;
  const specificType = orderData.specificServiceType;

  // Set base price based on specific type
  servicesPrice +=
    specificTypes.find((s) => s.id === specificType)?.priceFrom || 0;
  // Add price adjustments based on property details
  if (orderData.bedrooms) {
    // Add $20 per bedroom after the first
    const bedroomCount =
      orderData.bedrooms === "4+" ? 4 : parseInt(orderData.bedrooms);
    if (bedroomCount > 1) {
      servicesPrice += (bedroomCount - 1) * 20;
    }
  }

  if (orderData.bathrooms) {
    // Add $25 per bathroom after the first
    const bathroomCount =
      orderData.bathrooms === "4+" ? 4 : parseInt(orderData.bathrooms);
    if (bathroomCount > 1) {
      servicesPrice += (bathroomCount - 1) * 25;
    }
  }

  return servicesPrice;
}

export function calculateAddOnsPrice(orderData: Partial<OrderFormValues>) {
  let addOnsPrice = 0;

  // Add prices for selected add-ons
  if (orderData.addOns && orderData.addOns.length > 0) {
    orderData.addOns.forEach((addonId) => {
      const addon = addOnOptions.find((a) => a.id === addonId);
      if (addon) {
        addOnsPrice += addon.price;
      }
    });
  }

  // Add pricing based on square footage
  if (orderData.squareFootage) {
    const footage = orderData.squareFootage;

    // Add additional charges based on square footage tiers
    if (footage === "1000") {
      addOnsPrice += 15; // Small additional charge for 500-1000 sq ft
    } else if (footage === "1500") {
      addOnsPrice += 30; // Medium additional charge for 1000-1500 sq ft
    } else if (footage === "2000") {
      addOnsPrice += 45; // Larger charge for 1500-2000 sq ft
    } else if (footage === "2500+") {
      addOnsPrice += 60; // Largest charge for 2500+ sq ft
    }
    // No additional charge for the smallest size (up to 500 sq ft)
  }
  return addOnsPrice;
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
