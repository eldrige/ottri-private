import ReactMarkdown from "react-markdown";
import ApplyForm from "./components/ApplyForm";

export default function ApplyCleanerPage() {
  const jobDescription = `
# Cleaning Technicians in Louisville, Ky

OTTRI Cleaning Services is looking for self-motivated Cleaner to work $13.00/hour, up to 20 hours per week.

**YOU MUST HAVE A RELIABLE TRANSPORTATION** and willing to drive to site in LOUISVILLE, KY (if applicable).

Duties include general and detail cleaning of houses, warehouses, offices, restrooms and break rooms (dusting, vacuuming, mopping, emptying trash and various other cleaning responsibilities).

We are only interested in dependable, trustworthy, enthusiastic, energetic Cleans WHO WANT TO WORK and have an excellent work ethic. You must be 18yrs or older, MUST PASS background check and drug screen test.

*Hours are available at other locations if future employee wants more hours*

## Setting:

- Office Building
- Houses
- Hospitals
- Warehouses
- Other locations as required

## This Job:

- Open to applicants who do not have a high school diploma/GED
- A "Fair Chance" job (you or the employer follow Fair Chance hiring practices when performing background checks)
- A good fit for applicants with gaps in their resume, or who have been out of the workforce for the past 6 months or more
- A good job for someone just entering the workforce or returning to the workforce with limited experience and education
- A job for which all ages, including older job seekers, are encouraged to apply
- Open to applicants who do not have a college diploma

## Work Remotely:

- No

## Job Details:

**Job Type:** Part-time

**Pay:** From $13.00 per hour

**Expected hours:** 20 per week

## Benefits:

- Flexible schedule

## Physical Setting:

- Office
- Warehouse
- Hospitals
- Houses

## Schedule:

- Monday to Saturday

## Education:

- High school or equivalent (Preferred)

## Experience:

- Custodial Experience: 2 years (Preferred)

## Work Location:

In person

---

If you require alternative methods of application or screening, you must approach us by call or email.
`;

  return (
    <div className="container mx-auto py-8 px-4 text-secondary-700">
      <div className="prose max-w-none mb-8 prose-headings:text-secondary-700 prose-strong:text-secondary-700">
        <ReactMarkdown>{jobDescription}</ReactMarkdown>
      </div>
      <ApplyForm />
    </div>
  );
}
