import docker
import os


def run_theia_container(container_name, port, workspace_dir):
    """
    Run a Theia IDE container with specific configurations.

    Args:
        container_name (str): Unique name for the container.
        port (int): Port to expose Theia IDE.
        workspace_dir (str): Path to the local workspace directory to mount in the container.
    """
    client = docker.from_env()

    # Ensure the workspace directory exists
    if not os.path.exists(workspace_dir):
        os.makedirs(workspace_dir)

    try:
        # Run the Theia container
        container = client.containers.run(
            "ghcr.io/eclipse-theia/theia-ide/theia-ide:1.57.100",  # Use the prebuilt Theia IDE image
            name=container_name,
            ports={
                "3000/tcp": port
            },  # Expose Theia's default port (3000) to a dynamic host port
            volumes={
                workspace_dir: {
                    "bind": "/home/project",
                    "mode": "rw",
                }  # Mount the workspace
            },
            environment={
                # Add any environment variables for customization
                "THEIA_WORKSPACE_DIR": "/home/project"
            },
            detach=True,  # Run container in detached mode
        )
        print(
            f"Theia IDE container '{container_name}' is running on http://localhost:{port}"
        )
        return container
    except docker.errors.APIError as e:
        print(f"Failed to start the container: {e}")
        return None


# Example usage
if __name__ == "__main__":
    container_name = "theia_user_1"  # A unique name for the container
    host_port = 4000  # Host port to map to Theia IDE
    workspace_path = "user_1"  # Local directory for the user's workspace

    # Start the container
    container = run_theia_container(container_name, host_port, workspace_path)

    # Additional container management logic can be added here
