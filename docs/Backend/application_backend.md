# Application backend logic

## status

-   Visible status: Submitted -> Processing -> (Rejected, Approved)
    1. `submitted` (by student)
    2. `processing` (by system)
    3. (`waitlist`) / `rejected` / `offered` (by housing)
    4. `withdrawn` (by student)
    5. `confirmed`
-   Internal status:
    1. `submitted` (by student)
    2. `sys-allocated` / `sys-rejection` / `sys-waitlist` (by system)
    3. `pending-allocation` / `pending-rejection` / `pending-waitlist` (by admin)
    4. (`waitlist`) / `rejected` / `offered` (by housing)
    5. `withdrawn` (by student)
    6. `confirmed`
