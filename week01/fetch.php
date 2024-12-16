<?php 
require_once "db.php";

$sql = "SELECT nim, nama FROM mahasiswa ORDER BY nama LIMIT 10";

$result = $conn->query($sql) or die($conn->error);

$conn->close();
?>

<table border="1" width="100%">
	<thead>
		<tr>
			<th>NIM</th>
			<th>Nama</th>
		</tr>
	</thead>
	<tbody>
		<?php 
		while($row = $result->fetch_assoc()){
		 

		?>
		<tr>
			<td><?= $row['nim']?></td>
			<td><?= $row['nama']?></td>
		</tr>

		<?php 
		}	
		?>
	</tbody>
</table>