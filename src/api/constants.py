class ApStatus:
    # by student action
    SUBMIT = "submitted"
    WITHDRAW = "withdrawn"
    CONFIRM = "confirmed"
    # by admin/system action
    PROCESS = "processing"
    WAITLIST = "waitlist"
    REJECTE = "rejected"
    OFFERE = "offered"
    # by system automation
    SYS_ALLOCATE = "sys-allocated"
    SYS_REJECTE = "sys-rejection"
    SYS_WAITLIST = "sys-waitlist"
    # by admin manual action
    PRE_ALLOCATE = "pending-allocation"
    PRE_REJECT = "pending-rejection"
    PRE_WAITLIST = "pending-waitlist"
