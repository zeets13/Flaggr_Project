from datetime import datetime, timedelta


MAX_VIOLATIONS = 3

BLOCK_DURATION_MINUTES = 5

class ViolationManager:

    def __init__(self):


        self.users = {}

    # --------------------------------------------------------

    def _create_user(self, user_id):

        if user_id not in self.users:

            self.users[user_id] = {
                "violations": 0,
                "blocked_until": None
            }

    # --------------------------------------------------------

    def is_blocked(self, user_id):

        self._create_user(user_id)

        blocked_until = self.users[user_id]["blocked_until"]

        if blocked_until is None:
            return False

        # Block expired

        if datetime.now() >= blocked_until:

            self.users[user_id]["blocked_until"] = None
            self.users[user_id]["violations"] = 0

            return False

        return True

    # --------------------------------------------------------

    def add_violation(self, user_id):

        self._create_user(user_id)

        self.users[user_id]["violations"] += 1

        # Block after 3 violations

        if self.users[user_id]["violations"] >= MAX_VIOLATIONS:

            self.users[user_id]["blocked_until"] = (
                datetime.now() +
                timedelta(minutes=BLOCK_DURATION_MINUTES)
            )

            return True

        return False

    # --------------------------------------------------------

    def get_status(self, user_id):

        self._create_user(user_id)

        blocked = self.is_blocked(user_id)

        remaining = 0

        if blocked:

            remaining = int(
                (
                    self.users[user_id]["blocked_until"]
                    - datetime.now()
                ).total_seconds()
            )

        return {

            "violations":
                self.users[user_id]["violations"],

            "blocked":
                blocked,

            "remaining_seconds":
                remaining
        }

    # --------------------------------------------------------

    def reset(self, user_id):

        self.users[user_id] = {

            "violations": 0,

            "blocked_until": None
        }

if __name__ == "__main__":

    manager = ViolationManager()

    USER = "jarifa"

    print(manager.get_status(USER))

    print()

    for i in range(4):

        blocked = manager.add_violation(USER)

        print(f"Violation {i+1}")

        print(manager.get_status(USER))

        print("Blocked:", blocked)

        print()