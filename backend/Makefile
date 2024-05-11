  # Poetry commands
    .PHONY: env
    env:
        poetry shell

    .PHONY: deact
    deact:
        poetry exit


    # Django commands
    # Run Django server
    .PHONY: server
    server:
        poetry run python -m manage runserver


	# Run Django migrations
    .PHONY: migrations
    migrations:
        poetry run python -m manage makemigrations; poetry run python -m manage migrate